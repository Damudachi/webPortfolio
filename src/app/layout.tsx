import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { SITE } from "@/lib/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  keywords: [
    "Aldrich Sabando",
    "applied AI",
    "machine learning engineer",
    "computer vision",
    "full-stack developer",
    "Holy Angel University",
    "Philippines",
  ],
  openGraph: {
    type: "profile",
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
