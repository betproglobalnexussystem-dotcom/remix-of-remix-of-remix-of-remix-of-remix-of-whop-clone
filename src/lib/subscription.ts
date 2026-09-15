// Client-safe subscription helpers. Pricing is region based and the payment
// providers are wired as placeholders until real API credentials are added.

export type Region = "UG" | "INTL";

export type PlanPrice = {
	region: Region;
	currency: "UGX" | "USD";
	amount: number;
	label: string;
	period: string;
};

export const UG_PLAN: PlanPrice = {
	region: "UG",
	currency: "UGX",
	amount: 5000,
	label: "UGX 5,000",
	period: "per month",
};

export const INTL_PLAN: PlanPrice = {
	region: "INTL",
	currency: "USD",
	amount: 5.99,
	label: "USD 5.99",
	period: "per month",
};

/** Best-effort region guess from the browser timezone / locale. */
export function detectRegion(): Region {
	if (typeof window === "undefined") return "INTL";
	try {
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
		if (tz === "Africa/Kampala") return "UG";
		const langs = [navigator.language, ...(navigator.languages ?? [])];
		if (langs.some((l) => typeof l === "string" && l.toUpperCase().endsWith("-UG")))
			return "UG";
	} catch {
		/* ignore */
	}
	return "INTL";
}

export function planFor(region: Region): PlanPrice {
	return region === "UG" ? UG_PLAN : INTL_PLAN;
}

export type PaymentMethod =
	| "mobile-money"
	| "card"
	| "paypal"
	| "google-pay"
	| "whop";

export const PAYMENT_METHODS: {
	id: PaymentMethod;
	name: string;
	blurb: string;
	regions: Region[];
}[] = [
	{
		id: "mobile-money",
		name: "Mobile Money",
		blurb: "MTN MoMo and Airtel Money — pay in Uganda Shillings.",
		regions: ["UG", "INTL"],
	},
	{
		id: "paypal",
		name: "PayPal",
		blurb: "Pay with PayPal balance or any card.",
		regions: ["UG", "INTL"],
	},
	{
		id: "whop",
		name: "Whop",
		blurb: "Membership checkout through Whop.",
		regions: ["UG", "INTL"],
	},
];

const KEY = "mageye.subscription";

export type SubscriptionState = {
	active: boolean;
	region: Region;
	method?: PaymentMethod;
	startedAt?: number;
	/** Device login the subscription belongs to. */
	deviceId?: string;
	deviceEmail?: string;
	deviceLabel?: string;
	receiptId?: string;
};

export function readSubscription(): SubscriptionState | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as SubscriptionState;
		return parsed && parsed.active ? parsed : null;
	} catch {
		return null;
	}
}

/** Saves the subscription and stamps it with this device's silent login. */
export function writeSubscription(state: SubscriptionState) {
	if (typeof window === "undefined") return;
	const identity = getDeviceIdentity();
	const record: SubscriptionState = {
		...state,
		deviceId: state.deviceId ?? identity?.deviceId,
		deviceEmail: state.deviceEmail ?? identity?.email,
		deviceLabel: state.deviceLabel ?? identity?.label,
	};
	window.localStorage.setItem(KEY, JSON.stringify(record));
}

/** Marks access active when Whop sends the visitor back with ?paid=1. */
export function activateFromReturnUrl(region: Region): boolean {
	if (typeof window === "undefined") return false;
	const url = new URL(window.location.href);
	if (url.searchParams.get("paid") !== "1") return false;
	writeSubscription({ active: true, region, startedAt: Date.now() });
	url.searchParams.delete("paid");
	window.history.replaceState({}, "", url.toString());
	return true;
}

export function clearSubscription() {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(KEY);
}
