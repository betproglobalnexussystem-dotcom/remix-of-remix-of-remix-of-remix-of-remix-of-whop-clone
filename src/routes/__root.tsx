import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { SiteLoader } from "../components/SiteLoader";
import { IMG } from "../data/site";
import styles from "../styles.css?url";

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isCheckout = pathname.startsWith("/checkout");

  if (isCheckout) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="site-shell">
        <Header />
        <main className="site-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: "MAGEYE" },
      {
        name: "description",
        content:
          "SAND explores who we are beyond ultimate truths, binary thinking, and individual awakening.",
      },
      { property: "og:title", content: "MAGEYE" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: IMG.logo },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMG.logo },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Marcellus&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: IMG.favicon },
    ],
  }),
  component: RootLayout,
  shellComponent: RootDocument,
});
