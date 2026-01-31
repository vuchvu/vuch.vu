import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
        <div className="min-h-screen flex flex-col">
          <header className="px-6 py-4 border-b border-black/10">
            <nav>
              <Link href="/" className="text-sm font-medium">
                vuch.vu
              </Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="px-6 py-4 text-xs text-center">
            &copy; {new Date().getFullYear()} vuch.vu
          </footer>
        </div>
      </body>
    </html>
  );
}
