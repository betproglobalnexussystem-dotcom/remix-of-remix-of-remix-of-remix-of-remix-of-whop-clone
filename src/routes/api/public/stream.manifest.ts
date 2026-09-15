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
				const range = request.headers.get("range");
				const upstream = await fetch(source.manifest, {
					headers: {
						accept: "video/mp4,application/dash+xml,*/*",
						...(range ? { range } : {}),
					},
				});
				if (!upstream.ok && upstream.status !== 206) {
					return new Response("Upstream error", { status: 502 });
				}
				const headers = new Headers({
					"content-type":
						upstream.headers.get("content-type") ?? "video/mp4",
					"cache-control": "private, no-store, max-age=0",
					"x-content-type-options": "nosniff",
					"accept-ranges": "bytes",
				});
				for (const key of ["content-length", "content-range"]) {
					const value = upstream.headers.get(key);
					if (value) headers.set(key, value);
				}
				return new Response(upstream.body, {
					status: upstream.status,
					headers,
				});
			},
		},
	},
});
