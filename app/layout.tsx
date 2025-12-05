import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * DopaLive Font Configuration
 * 
 * Typography optimized for ADHD:
 * - Syne: Warm, friendly display font for headings
 * - DM Sans: Highly readable body text with good letter spacing
 * - JetBrains Mono: Clear monospace for code/numbers
 */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * DopaLive Metadata Configuration
 */
export const metadata: Metadata = {
  title: {
    default: "DopaLive — Birlikte Odaklan, Birlikte Başar",
    template: "%s | DopaLive",
  },
  description:
    "DEHB'li yaratıcılar için canlı co-working oturumları. Dopamin dostu bir ortamda başkalarıyla birlikte çalış, odaklan ve projelerini tamamla.",
  keywords: [
    "DEHB",
    "ADHD",
    "co-working",
    "body doubling",
    "focus",
    "odaklanma",
    "verimlilik",
    "productivity",
    "birlikte çalışma",
    "yaratıcılar",
    "dopamin",
  ],
  authors: [{ name: "DopaLive" }],
  creator: "DopaLive",
  publisher: "DopaLive",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://dopalive.app",
    siteName: "DopaLive",
    title: "DopaLive — Birlikte Odaklan, Birlikte Başar",
    description:
      "DEHB'li yaratıcılar için canlı co-working oturumları. Dopamin dostu bir ortamda birlikte çalış.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DopaLive - Birlikte Odaklan, Birlikte Başar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DopaLive — Birlikte Odaklan, Birlikte Başar",
    description:
      "DEHB'li yaratıcılar için canlı co-working oturumları.",
    images: ["/og-image.png"],
    creator: "@dopalive",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

/**
 * Viewport Configuration
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFBF7" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1C1A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Root Layout
 *
 * DopaLive's main application layout:
 * - Warm, ADHD-friendly color scheme
 * - Accessible font configuration
 * - Skip to content link
 * - Toast notifications
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased font-body">
        <Providers>
          {/* Skip to main content - Accessibility */}
          <a
            href="#main-content"
            className={`
              sr-only focus:not-sr-only 
              focus:fixed focus:top-4 focus:left-4 focus:z-[100] 
              focus:px-4 focus:py-2 
              focus:bg-primary focus:text-white 
              focus:rounded-xl focus:shadow-warm-md
            `}
          >
            Ana içeriğe geç
          </a>

          {/* Site Header */}
          <SiteHeader />

          {/* Main Content */}
          <main id="main-content" className="flex-1 pt-20">
            {children}
          </main>

          {/* Site Footer */}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
