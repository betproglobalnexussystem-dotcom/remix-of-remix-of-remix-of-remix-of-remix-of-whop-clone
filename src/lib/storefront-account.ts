// Everything here has to be safe in the browser: a route that renders a price
// or a label pulls this module into the client bundle. Anything reading the
// filesystem or the environment belongs in whop.server.ts instead.

export function productLabels(product: unknown): string[] {
	if (typeof product !== "object" || product === null) return [];
	const labels = (product as { labels?: unknown }).labels;
	if (!Array.isArray(labels)) return [];
	return labels
		.filter((label): label is string => typeof label === "string")
		.map((label) => label.toLowerCase());
}

export function planProductId(plan: { product?: unknown }): string | undefined {
	const product = plan.product;
	if (typeof product !== "object" || product === null) return undefined;
	if (!("id" in product)) return undefined;
	return typeof product.id === "string" ? product.id : undefined;
}

export function formatPlanPrice(plan: { initial_price?: number }): string {
	const amount = plan.initial_price;
	if (typeof amount !== "number") return "";
	return `$${amount.toFixed(2)}`;
}

export function planPriceCents(plan: { initial_price?: number }): number {
	const amount = plan.initial_price;
	if (typeof amount !== "number") return 0;
	return Math.round(amount * 100);
}
