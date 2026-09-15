import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

/**
 * Resolve the visitor's country from the request IP (edge headers first, then a
 * lightweight IP lookup) and map it to a pricing region.
 */
export const getRegionByIp = createServerFn({ method: "GET" }).handler(
	async (): Promise<{ region: "UG" | "INTL"; country: string | null }> => {
		let country: string | null = null;
		try {
			const request = getWebRequest();
			const h = request.headers;
			country =
				h.get("cf-ipcountry") ??
				h.get("x-vercel-ip-country") ??
				h.get("x-country-code") ??
				h.get("x-geo-country") ??
				null;

			if (!country) {
				const ip = (h.get("cf-connecting-ip") ??
					h.get("x-real-ip") ??
					h.get("x-forwarded-for") ??
					"")
					.split(",")[0]
					?.trim();
				if (ip) {
					const res = await fetch(`https://ipapi.co/${ip}/country/`, {
						signal: AbortSignal.timeout(2500),
					});
					if (res.ok) {
						const text = (await res.text()).trim();
						if (/^[A-Za-z]{2}$/.test(text)) country = text;
					}
				}
			}
		} catch {
			/* ignore — fall back to international pricing */
		}

		const code = country ? country.toUpperCase() : null;
		return { region: code === "UG" ? "UG" : "INTL", country: code };
	},
);
