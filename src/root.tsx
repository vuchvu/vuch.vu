import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./globals.css";
import type { Link as NavLink } from "@/lib/types";

const siteUrl = "https://vuch.vu";
const title = "ヴヂュヴのホームページ";
const description = "ヴヂュヴのポートフォリオサイトです。";
const ogImage = `${siteUrl}/ogp.png`;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap",
  },
];

export const meta: Route.MetaFunction = () => [
  { title },
  { name: "description", content: description },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:url", content: siteUrl },
  { property: "og:site_name", content: "vuch.vu" },
  { property: "og:locale", content: "ja_JP" },
  { property: "og:image", content: ogImage },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
  { name: "twitter:image", content: ogImage },
];

// JSON-LD構造化データ
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "ヴヂュヴ",
  url: siteUrl,
  sameAs: [
    "https://x.com/x_vuchvu_x",
    "https://github.com/vuchvu",
    "https://www.pixiv.net/users/6518175",
  ],
};

const sections: NavLink[] = [
  { label: "自己紹介", url: "/" },
  { label: "作品", url: "/works" },
  { label: "リンク", url: "/links" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-black/10 px-6 py-4">
            <nav aria-label="sections">
              <ul className="flex justify-center gap-4 text-sm">
                {sections.map((section) => (
                  <li key={section.url}>
                    <Link
                      to={section.url}
                      className="underline underline-offset-4"
                    >
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="px-6 py-4 text-center text-xs">
            &copy; {new Date().getFullYear()} vuch.vu
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "エラーが発生しました";
  let details = "予期しないエラーが発生しました。";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : `${error.status}`;
    details =
      error.status === 404
        ? "ページが見つかりませんでした。"
        : error.statusText || details;
  }

  return (
    <div className="mx-auto max-w-xl space-y-4 p-8 text-center">
      <h1 className="text-4xl font-bold">{message}</h1>
      <p>{details}</p>
    </div>
  );
}
