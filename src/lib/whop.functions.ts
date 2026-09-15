import { createServerFn } from "@tanstack/react-start";

type CheckoutInput = {
	planId: string;
	region: "UG" | "INTL";
	method: string;
	redirectUrl?: string;
};

/**
 * Creates a Whop checkout session and returns the hosted checkout URL.
 * The Whop API key lives in the server environment, never in the browser.
 */
export const createWhopCheckout = createServerFn({ method: "POST" })
	.inputValidator((input: CheckoutInput) => input)
	.handler(
		async ({
			data,
		}): Promise<{ url: string | null; error: string | null }> => {
			const key = process.env["WHOP_API_KEY"];
			if (!key) return { url: null, error: "Whop API key is not configured." };
			if (!data.planId)
				return {
					url: null,
					error:
						"No Whop plan is set for this region yet. Add the plan ID in the admin dashboard under Subscription.",
				};

			try {
				const res = await fetch("https://api.whop.com/api/v2/checkout_sessions", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${key}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						plan_id: data.planId,
						metadata: { region: data.region, method: data.method },
						...(data.redirectUrl ? { redirect_url: data.redirectUrl } : {}),
					}),
					signal: AbortSignal.timeout(10000),
				});

				const body = (await res.json().catch(() => null)) as
					| { purchase_url?: string; id?: string; error?: unknown }
					| null;

				if (!res.ok) {
					return {
						url: null,
						error:
							typeof body?.error === "string"
								? body.error
								: `Whop rejected the checkout (status ${res.status}).`,
					};
				}

				const url =
					body?.purchase_url ??
					(body?.id ? `https://whop.com/checkout/${body.id}` : null);
				return url
					? { url, error: null }
					: { url: null, error: "Whop did not return a checkout link." };
			} catch {
				return { url: null, error: "Could not reach Whop. Please try again." };
			}
		},
	);
