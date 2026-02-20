import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import type { Link as NavLink } from "./lib/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ヴヂュヴのホームページ",
};

const sections: NavLink[] = [
  { label: "自己紹介", url: "/" },
  { label: "作品", url: "/works" },
  { label: "リンク", url: "/links" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-black/10 px-6 py-4">
            <nav aria-label="sections">
              <ul className="flex justify-center gap-4 text-sm">
                {sections.map((section) => (
                  <li key={section.url}>
                    <Link
                      href={section.url}
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
      </body>
    </html>
  );
}
