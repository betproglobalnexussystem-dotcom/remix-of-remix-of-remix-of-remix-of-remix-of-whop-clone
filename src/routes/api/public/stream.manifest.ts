import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/stream/manifest")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const { verifyTicket, streamSourceFor } = await import(
					"../../../lib/stream.server"
				);
				const token = new URL(request.url).searchParams.get("t") ?? "";
				const ticket = verifyTicket(token);
				if (!ticket) return new Response("Forbidden", { status: 403 });

				const source = streamSourceFor(ticket.slug);
				const upstream = await fetch(source.manifest, {
					headers: { accept: "application/dash+xml,*/*" },
				});
				if (!upstream.ok) {
					return new Response("Upstream error", { status: 502 });
				}
				return new Response(await upstream.text(), {
					status: 200,
					headers: {
						"content-type":
							upstream.headers.get("content-type") ?? "application/dash+xml",
						"cache-control": "private, no-store, max-age=0",
						"x-content-type-options": "nosniff",
					},
				});
			},
		},
	},
});
