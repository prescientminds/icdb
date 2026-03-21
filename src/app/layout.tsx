import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import NavSearch from "@/components/NavSearch";
import { CityProvider } from "@/components/CityContext";
import CityPills from "@/components/CityPills";
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
        <CityProvider>
          <nav className="border-b border-stone-200 bg-surface sticky top-0 z-40">
            <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
              <Link href="/" className="text-xl font-bold tracking-tight text-stone-900 no-underline hover:no-underline shrink-0">
                ICDB
              </Link>
              <CityPills />
              <div className="flex-1 max-w-md">
                <NavSearch />
              </div>
              <div className="flex gap-6 text-sm font-medium text-stone-600 shrink-0">
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
        </CityProvider>
      </body>
    </html>
  );
}
