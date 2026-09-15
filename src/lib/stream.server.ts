import { createHmac, timingSafeEqual } from "crypto";

/**
 * Server-only streaming catalogue. Manifest + license URLs never reach the
 * browser directly: the client only ever receives a short-lived signed ticket
 * that the token-gated redirect route exchanges for the real URL.
 */
type StreamSource = {
	manifest: string;
	licenseUrl?: string;
	drm?: "widevine" | "playready" | "fairplay" | "clearkey";
};

// Replace these with your own DRM-packaged (Widevine/PlayReady) DASH manifests.
// Until then every film falls back to a DRM-protected reference stream so the
// protection pipeline is fully exercised end to end.
const FALLBACK: StreamSource = {
	manifest:
		"https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd",
	licenseUrl: "https://cwip-shaka-proxy.appspot.com/no_auth",
	drm: "widevine",
};

const SOURCES: Record<string, StreamSource> = {};

export function streamSourceFor(slug: string): StreamSource {
	return SOURCES[slug] ?? FALLBACK;
}

const TTL_SECONDS = 60 * 5;

function secret(): string {
	const value = process.env["STREAM_TOKEN_SECRET"];
	if (!value) throw new Error("STREAM_TOKEN_SECRET is not configured");
	return value;
}

function sign(payload: string): string {
	return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function issueTicket(slug: string, sessionId: string): {
	token: string;
	expiresAt: number;
} {
	const expiresAt = Math.floor(Date.now() / 1000) + TTL_SECONDS;
	const payload = `${slug}.${sessionId}.${expiresAt}`;
	return { token: `${payload}.${sign(payload)}`, expiresAt };
}

export function verifyTicket(
	token: string,
): { slug: string; sessionId: string } | null {
	const parts = token.split(".");
	if (parts.length !== 4) return null;
	const [slug, sessionId, expiresRaw, signature] = parts;
	const payload = `${slug}.${sessionId}.${expiresRaw}`;
	const expected = sign(payload);
	const a = Buffer.from(signature ?? "");
	const b = Buffer.from(expected);
	if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
	const expiresAt = Number(expiresRaw);
	if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
		return null;
	}
	return { slug: slug!, sessionId: sessionId! };
}
