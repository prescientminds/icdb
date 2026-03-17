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
  title: "ICDB — Internet Chef Database",
  description: "The pedigree and lineage of chefs, mapped.",
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
        <nav className="border-b border-stone-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-stone-900 no-underline hover:no-underline">
              ICDB
            </Link>
            <div className="flex gap-6 text-sm font-medium text-stone-600">
              <Link href="/chefs" className="hover:text-stone-900 no-underline">Chefs</Link>
              <Link href="/restaurants" className="hover:text-stone-900 no-underline">Restaurants</Link>
              <Link href="/lineage" className="hover:text-stone-900 no-underline">Lineage</Link>
              <Link href="/groups" className="hover:text-stone-900 no-underline">Groups</Link>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-6xl px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
