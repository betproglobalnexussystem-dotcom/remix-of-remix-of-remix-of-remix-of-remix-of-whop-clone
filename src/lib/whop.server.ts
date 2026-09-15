// Server-only Whop configuration. This file never ships to the browser.
export const WHOP_API_KEY =
	"apik_MFzbm4STJ087W_C6565930_C_8c051bd772e5fa561700ff55c03299e0150d45197003a7833a01f14fd540ee";

export const WHOP_API = "https://api.whop.com/api/v2";

export type WhopRegion = "UG" | "INTL";

/** Price per region for the streaming membership. */
export const WHOP_PRICES: Record<
	WhopRegion,
	{ currency: string; amount: number; title: string }
> = {
	UG: { currency: "ugx", amount: 5000, title: "MAGEYE Streaming — Uganda" },
	INTL: {
		currency: "usd",
		amount: 5.99,
		title: "MAGEYE Streaming — International",
	},
};

const planCache = new Map<WhopRegion, string>();

async function whop(path: string, init?: RequestInit) {
	const res = await fetch(`${WHOP_API}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${WHOP_API_KEY}`,
			"Content-Type": "application/json",
			...(init?.headers ?? {}),
		},
		signal: AbortSignal.timeout(12000),
	});
	const body = (await res.json().catch(() => null)) as any;
	return { ok: res.ok, status: res.status, body };
}

/**
 * Finds (or creates) the Whop plan for a region so nothing has to be
 * configured by hand in the dashboard.
 */
export async function ensurePlan(region: WhopRegion): Promise<string | null> {
	const cached = planCache.get(region);
	if (cached) return cached;

	const price = WHOP_PRICES[region];

	const list = await whop("/plans?per=50");
	const plans: any[] = Array.isArray(list.body?.data) ? list.body.data : [];
	const match = plans.find(
		(plan) =>
			(plan?.internal_notes === price.title || plan?.title === price.title) &&
			plan?.id,
	);
	if (match?.id) {
		planCache.set(region, match.id);
		return match.id as string;
	}

	const created = await whop("/plans", {
		method: "POST",
		body: JSON.stringify({
			plan_type: "renewal",
			billing_period: 30,
			base_currency: price.currency,
			renewal_price: price.amount,
			initial_price: 0,
			visibility: "quick_link",
			internal_notes: price.title,
		}),
	});
	if (created.ok && created.body?.id) {
		planCache.set(region, created.body.id as string);
		return created.body.id as string;
	}

	// Last resort: reuse any existing live plan so checkout still opens.
	const fallback = plans.find((plan) => plan?.id)?.id;
	if (fallback) {
		planCache.set(region, fallback as string);
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
