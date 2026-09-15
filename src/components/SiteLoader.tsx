import { useEffect, useState } from "react";

/**
 * Full-screen loading veil. Stays up until the page has fully loaded:
 * document load event, web fonts ready, and every <img> finished decoding.
 */
export function SiteLoader() {
	const [done, setDone] = useState(false);
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		let cancelled = false;

		const imagesReady = () =>
			Promise.all(
				Array.from(document.images).map((img) =>
					img.complete
						? Promise.resolve()
						: new Promise<void>((resolve) => {
								img.addEventListener("load", () => resolve(), { once: true });
								img.addEventListener("error", () => resolve(), { once: true });
							}),
				),
			);

		const pageLoaded = () =>
			document.readyState === "complete"
				? Promise.resolve()
				: new Promise<void>((resolve) =>
						window.addEventListener("load", () => resolve(), { once: true }),
					);

		const fontsReady = () =>
			(document as Document & { fonts?: FontFaceSet }).fonts?.ready ??
			Promise.resolve();

		const safety = window.setTimeout(() => {
			if (!cancelled) setDone(true);
		}, 8000);

		void (async () => {
			await pageLoaded();
			await fontsReady();
			await imagesReady();
			// one more pass for images added during hydration
			await new Promise((r) => window.setTimeout(r, 150));
			await imagesReady();
			if (!cancelled) setDone(true);
		})();

		return () => {
			cancelled = true;
			window.clearTimeout(safety);
		};
	}, []);

	useEffect(() => {
		if (!done) return;
		const timer = window.setTimeout(() => setHidden(true), 450);
		return () => window.clearTimeout(timer);
	}, [done]);

	useEffect(() => {
		document.body.style.overflow = hidden ? "" : "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [hidden]);

	if (hidden) return null;

	return (
		<div className={`site-loader${done ? " is-done" : ""}`} aria-hidden="true">
			<div className="loader" />
		</div>
	);
}
