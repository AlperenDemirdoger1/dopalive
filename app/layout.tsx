import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DopaLive - Odaklan!",
  description:
    "DEHB'yi bilen uzman koçlar, accountability ve odak araçlarıyla projelerini bitir. Nörobilim tabanlı koçluk ve odak platformu.",
  keywords: [
    "DEHB",
    "koçluk",
    "coaching",
    "accountability",
    "body doubling",
    "odak",
    "productivity",
    "nörobilim",
    "dopamin",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-body">
        <AnalyticsProvider>
          <SiteHeader />
          <main className="pt-20">{children}</main>
          <SiteFooter />
        </AnalyticsProvider>
      </body>
    </html>
  );
}