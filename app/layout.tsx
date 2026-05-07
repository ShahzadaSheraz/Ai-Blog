import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LayoutAnimation } from "@/components/animations/LayoutAnimation";
import { siteConfig } from "@/lib/site";
import { Providers } from "@/app/providers";
import { getAllPostSummaries } from "@/lib/posts";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Modern AI & Tech Learning Hub`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchIndex = getAllPostSummaries().map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    tags: p.tags,
  }));

  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[color:var(--background)]">
        <Providers>
          <Header liteSearchPosts={searchIndex} />
          <LayoutAnimation>
            <main className="flex-1">{children}</main>
          </LayoutAnimation>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
