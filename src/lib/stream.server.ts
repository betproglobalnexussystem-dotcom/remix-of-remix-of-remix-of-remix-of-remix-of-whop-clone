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

// Source URLs stay server-side; the browser only ever sees a signed ticket URL.
const FALLBACK: StreamSource = {
	manifest:
		"https://pub-eb00261df49f466a9e5efee154650b48.r2.dev/media/admin/02c0593d-4e27-4354-8f02-acc7325c5d43-Bedroom_Chains_Trailer_Final.mp4",
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
