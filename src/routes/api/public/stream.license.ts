import { createFileRoute } from "@tanstack/react-router";

const CORS = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "POST, OPTIONS",
	"access-control-allow-headers": "content-type",
};

export const Route = createFileRoute("/api/public/stream/license")({
	server: {
		handlers: {
			OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
			POST: async ({ request }) => {
				const { verifyTicket, streamSourceFor } = await import(
					"../../../lib/stream.server"
				);
				const token = new URL(request.url).searchParams.get("t") ?? "";
				const ticket = verifyTicket(token);
				if (!ticket) {
					return new Response("Forbidden", { status: 403, headers: CORS });
				}

				const source = streamSourceFor(ticket.slug);
				if (!source.licenseUrl) {
					return new Response("No license server", { status: 404, headers: CORS });
				}

				const body = await request.arrayBuffer();
				if (body.byteLength > 256 * 1024) {
					return new Response("Payload too large", { status: 413, headers: CORS });
				}

				const upstream = await fetch(source.licenseUrl, {
					method: "POST",
					body,
					headers: { "content-type": "application/octet-stream" },
				});
				return new Response(await upstream.arrayBuffer(), {
					status: upstream.status,
					headers: {
						...CORS,
						"content-type": "application/octet-stream",
						"cache-control": "private, no-store, max-age=0",
					},
				});
			},
		},
	},
});
