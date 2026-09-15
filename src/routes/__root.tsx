import type { ReactNode } from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isCheckout = pathname.startsWith("/checkout");

  if (isCheckout) {
    return <Outlet />;
  }

  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      {
        title: "MAGEYE",
      },
      {
        name: "description",
        content:
          "SAND explores who we are beyond ultimate truths, binary thinking, and individual awakening.",
      },
      { property: "og:title", content: "MAGEYE" },
      { property: "og:image", content: IMG.logo },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: IMG.favicon },
    ],
  }),
  component: RootLayout,
  shellComponent: RootDocument,
});
