import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { filmBySlug } from "../data/catalog";
import { getPlaybackTicket } from "../lib/stream.functions";

export const Route = createFileRoute("/watch/$slug")({
	component: WatchPage,
	loader: ({ params }) => {
		const film = filmBySlug(params.slug);
		if (!film) throw notFound();
		if (film.upcoming) throw notFound();
		return film;
	},
	head: ({ loaderData }) => ({
		meta: [
			{ title: `Watch ${loaderData?.title ?? "Film"} - MAGEYE` },
			{
				name: "description",
				content: `Stream ${loaderData?.title ?? "this film"} in protected, streaming-only playback on MAGEYE.`,
			},
			{ name: "robots", content: "noindex, nofollow, noarchive" },
			{ property: "og:title", content: `Watch ${loaderData?.title ?? "Film"} - MAGEYE` },
			{
				property: "og:description",
				content: "Protected streaming-only playback on MAGEYE.",
			},
			{ property: "og:type", content: "video.movie" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
	}),
});

function WatchPage() {
	const film = Route.useLoaderData();
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
	const [message, setMessage] = useState("Securing your session…");
	const [session, setSession] = useState("");

	useEffect(() => {
		let destroyed = false;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let player: any = null;

		async function boot() {
			try {
				const ticket = await getPlaybackTicket({ data: { slug: film.slug } });
				if (destroyed) return;
				setSession(ticket.sessionId);

				const shaka = (await import("shaka-player/dist/shaka-player.compiled"))
					.default as typeof import("shaka-player");
				shaka.polyfill.installAll();
				if (!shaka.Player.isBrowserSupported()) {
					setStatus("error");
					setMessage("This browser cannot play protected video. Try Chrome, Edge or Safari.");
					return;
				}

				const video = videoRef.current;
				if (!video) return;
				player = new shaka.Player();
				await player.attach(video);

				const servers: Record<string, string> = {};
				if (ticket.licenseUrl) {
					if (ticket.drm === "widevine")
						servers["com.widevine.alpha"] = ticket.licenseUrl;
					if (ticket.drm === "playready")
						servers["com.microsoft.playready"] = ticket.licenseUrl;
					if (ticket.drm === "fairplay")
						servers["com.apple.fps"] = ticket.licenseUrl;
				}

				player.configure({
					drm: {
						servers,
						// Require hardware-backed protection where the platform offers it.
						advanced: {
							"com.widevine.alpha": {
								videoRobustness: "HW_SECURE_DECODE",
								audioRobustness: "SW_SECURE_CRYPTO",
								persistentStateRequired: false,
							},
						},
					},
					streaming: { bufferingGoal: 20, rebufferingGoal: 4 },
					// Never write anything to disk: offline storage stays off.
					offline: { usePersistentLicense: false },
				});

				player.addEventListener("error", () => {
					setStatus("error");
					setMessage("Playback could not be verified. Please reload the page.");
				});

				await player.load(ticket.manifestUrl);
				if (destroyed) return;
				setStatus("ready");
			} catch {
				if (destroyed) return;
				setStatus("error");
				setMessage("This film is not available for streaming right now.");
			}
		}

		boot();
		return () => {
			destroyed = true;
			player?.destroy();
		};
	}, [film.slug]);

	// Anti-capture deterrents: block context menu, drag, keyboard save/print
	// shortcuts, and blank the frame when the tab or window loses focus.
	useEffect(() => {
		const node = containerRef.current;
		const block = (event: Event) => event.preventDefault();
		const keys = (event: KeyboardEvent) => {
			const k = event.key.toLowerCase();
			if ((event.ctrlKey || event.metaKey) && ["s", "p", "u"].includes(k)) {
				event.preventDefault();
			}
			if (k === "printscreen") event.preventDefault();
		};
		const onBlur = () => videoRef.current?.pause();
		const onVisibility = () => {
			if (document.hidden) videoRef.current?.pause();
		};

		node?.addEventListener("contextmenu", block);
		node?.addEventListener("dragstart", block);
		window.addEventListener("keydown", keys);
		window.addEventListener("blur", onBlur);
		document.addEventListener("visibilitychange", onVisibility);
		return () => {
			node?.removeEventListener("contextmenu", block);
			node?.removeEventListener("dragstart", block);
			window.removeEventListener("keydown", keys);
			window.removeEventListener("blur", onBlur);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);

	return (
		<div className="watch-page">
			<div className="watch-top">
				<Link to="/films/$slug" params={{ slug: film.slug }} className="watch-back">
					← Back to film
				</Link>
				<span className="watch-secure">Protected stream · streaming only</span>
			</div>

			<div className="watch-stage" ref={containerRef}>
				<video
					ref={videoRef}
					className="watch-video"
					controls
					playsInline
					controlsList="nodownload noplaybackrate noremoteplayback"
					disablePictureInPicture
					disableRemotePlayback
					poster={film.poster ?? film.image}
				/>
				{status !== "ready" ? (
					<div className="watch-overlay">
						<p>{message}</p>
					</div>
				) : null}
				{session ? (
					<span className="watch-watermark" aria-hidden>
						MAGEYE · {session}
					</span>
				) : null}
			</div>

			<div className="watch-meta">
				<p className="kicker">Now streaming</p>
				<h1 className="serif">{film.title}</h1>
				{film.duration ? <p className="meta">{film.duration}</p> : null}
				<p>{film.excerpt}</p>
				<p className="watch-note">
					This film is licensed for personal viewing only. Downloading, recording,
					re-streaming or redistributing it is prohibited and each session is
					watermarked and logged.
				</p>
			</div>
		</div>
	);
}
