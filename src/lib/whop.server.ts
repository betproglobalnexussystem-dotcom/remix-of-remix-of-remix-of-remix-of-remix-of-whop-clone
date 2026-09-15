export const WHOP_API = "https://api.whop.com/api/v1";
const WHOP_ACCOUNT_ID = "biz_kpS7a3ydqxnVhf";

export type WhopRegion = "UG" | "INTL";

/** Price per region for the streaming membership. */
export const WHOP_PRICES: Record<
	WhopRegion,
	{ currency: string; amount: number; title: string }
> = {
	UG: { currency: "usd", amount: 5.99, title: "MAGEYE Streaming — International" },
	INTL: {
		currency: "usd",
		amount: 5.99,
		title: "MAGEYE Streaming — International",
	},
};

const planCache = new Map<WhopRegion, string>();

async function whop(path: string, init?: RequestInit) {
	const apiKey = process.env["WHOP_API_KEY"];
	if (!apiKey) throw new Error("WHOP_API_KEY is not configured");
	const res = await fetch(`${WHOP_API}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
			...(init?.headers ?? {}),
		},
		signal: AbortSignal.timeout(12000),
	});
	const body = (await res.json().catch(() => null)) as any;
	return { ok: res.ok, status: res.status, body };
}

async function ensureStreamingProduct() {
	const list = await whop(`/products?account_id=${WHOP_ACCOUNT_ID}&first=50`);
	const products: any[] = Array.isArray(list.body?.data) ? list.body.data : [];
	const existing = products.find(
		(product) =>
			product?.metadata?.mageye_region === "INTL" ||
			product?.title === "MAGEYE Streaming — International",
	);
	if (existing?.id) return existing.id as string;

	const created = await whop("/products", {
		method: "POST",
		body: JSON.stringify({
			account_id: WHOP_ACCOUNT_ID,
			title: "MAGEYE Streaming — International",
			headline: "Unlimited streaming access to MAGEYE films",
			description: "Monthly streaming membership for MAGEYE films.",
			visibility: "hidden",
			metadata: { mageye_region: "INTL" },
		}),
	});
	return created.ok && created.body?.id ? (created.body.id as string) : null;
}

/**
 * Finds (or creates) the Whop plan for a region so nothing has to be
 * configured by hand in the dashboard.
 */
export async function ensurePlan(_region: WhopRegion): Promise<string | null> {
	const canonicalRegion: WhopRegion = "INTL";
	const cached = planCache.get(canonicalRegion);
	if (cached) return cached;

	const price = WHOP_PRICES[canonicalRegion];

	const list = await whop(`/plans?account_id=${WHOP_ACCOUNT_ID}&first=50`);
	const plans: any[] = Array.isArray(list.body?.data) ? list.body.data : [];
	const match = plans.find(
		(plan) =>
			(plan?.internal_notes === price.title || plan?.title === price.title) &&
			plan?.id,
	);
	if (match?.id) {
		planCache.set(canonicalRegion, match.id);
		return match.id as string;
	}
	const productId = await ensureStreamingProduct();
	if (!productId) return null;

	const created = await whop("/plans", {
		method: "POST",
		body: JSON.stringify({
			product_id: productId,
			plan_type: "renewal",
			billing_period: 30,
			currency: price.currency,
			renewal_price: price.amount,
			initial_price: 0,
			visibility: "visible",
			release_method: "buy_now",
			internal_notes: price.title,
		}),
	});
	if (created.ok && created.body?.id) {
		planCache.set(canonicalRegion, created.body.id as string);
		return created.body.id as string;
	}

	// Last resort: reuse any existing live plan so checkout still opens.
	const fallback = plans.find((plan) => plan?.id)?.id;
	if (fallback) {
		planCache.set(canonicalRegion, fallback as string);
		return fallback as string;
	}
	return null;
}

export async function createCheckoutUrl(input: {
	region: WhopRegion;
	method: string;
	redirectUrl?: string;
	planId?: string;
}): Promise<{ url: string | null; error: string | null }> {
	const planId = input.planId || (await ensurePlan(input.region));
	if (!planId)
		return { url: null, error: "Whop checkout is not available right now." };

	const session = await whop("/checkout_sessions", {
		method: "POST",
		body: JSON.stringify({
			plan_id: planId,
			metadata: { region: input.region, method: input.method },
			...(input.redirectUrl ? { redirect_url: input.redirectUrl } : {}),
		}),
	});

	const url =
		session.body?.purchase_url ??
		(session.body?.id ? `https://whop.com/checkout/${session.body.id}` : null);

	if (url) return { url, error: null };

	// Hosted quick link works even if session creation is unavailable.
	return { url: `https://whop.com/checkout/${planId}`, error: null };
}
