import { createServerFn } from "@tanstack/react-start";

type CheckoutInput = {
	planId?: string;
	region: "UG" | "INTL";
	method: string;
	redirectUrl?: string;
};

/**
 * Creates a Whop checkout session and returns the hosted checkout URL.
 * Plans are resolved (or created) automatically per region, so nothing has to
 * be configured by hand.
 */
export const createWhopCheckout = createServerFn({ method: "POST" })
	.inputValidator((input: CheckoutInput) => input)
	.handler(
		async ({
			data,
		}): Promise<{ url: string | null; error: string | null }> => {
			try {
				const { createCheckoutUrl } = await import("./whop.server");
				return await createCheckoutUrl({
					region: data.region,
					method: data.method,
					...(data.redirectUrl ? { redirectUrl: data.redirectUrl } : {}),
					...(data.planId ? { planId: data.planId } : {}),
				});
			} catch {
				return { url: null, error: "Could not reach Whop. Please try again." };
			}
		},
	);

/**
 * Resolves (creating if needed) the Whop plan for a region so the one-click
 * checkout button can mount without anything being configured by hand.
 */
export const getWhopPlanId = createServerFn({ method: "POST" })
	.inputValidator((input: { region: "UG" | "INTL" }) => input)
	.handler(async ({ data }): Promise<{ planId: string | null }> => {
		try {
			const { ensurePlan } = await import("./whop.server");
			return { planId: await ensurePlan(data.region) };
		} catch {
			return { planId: null };
		}
	});
