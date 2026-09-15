import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({ slug: z.string().min(1).max(120) });

export type PlaybackTicket = {
	manifestUrl: string;
	licenseUrl: string | null;
	drm: string | null;
	sessionId: string;
	expiresAt: number;
};

export const getPlaybackTicket = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => Input.parse(data))
	.handler(async ({ data }): Promise<PlaybackTicket> => {
		const { issueTicket, streamSourceFor } = await import("./stream.server");
		const source = streamSourceFor(data.slug);
		const sessionId = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
		const { token, expiresAt } = issueTicket(data.slug, sessionId);
		return {
			manifestUrl: `/api/public/stream/manifest?t=${encodeURIComponent(token)}`,
			licenseUrl: source.licenseUrl
				? `/api/public/stream/license?t=${encodeURIComponent(token)}`
				: null,
			drm: source.drm ?? null,
			sessionId,
			expiresAt,
		};
	});
