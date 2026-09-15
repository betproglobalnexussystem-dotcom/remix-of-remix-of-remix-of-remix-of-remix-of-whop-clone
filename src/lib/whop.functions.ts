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
					redirectUrl: data.redirectUrl,
					planId: data.planId,
				});
			} catch {
				return { url: null, error: "Could not reach Whop. Please try again." };
			}
		},
	);
