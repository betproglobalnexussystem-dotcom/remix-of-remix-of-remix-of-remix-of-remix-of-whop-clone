/** Public Whop checkout identifiers. Plan IDs are safe to expose in checkout UI. */
export const WHOP_STREAMING_PLAN_ID = "plan_C4qTUAkHvMwAV";

export function checkoutReturnUrl(redirectPath = "/films") {
	if (typeof window === "undefined") return "";
	const url = new URL("/checkout/complete", window.location.origin);
	url.searchParams.set("redirect", redirectPath);
	return url.toString();
}