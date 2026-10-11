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
    "software engineering intern",
    "full-stack developer",
    "DevOps",
    "applied AI",
    "machine learning engineer",
    "computer vision",
    "IT internship",
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

/**
 * Every reveal on this page is hidden only while `data-motion` is set, and
 * this is what sets it — before the first paint, so nothing is drawn and
 * then taken away again. If scripting is off, or the reader has asked for
 * reduced motion, the attribute never lands and the page arrives finished.
 */
const MOTION_SWITCH =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)" +
  "document.documentElement.dataset.motion='on'}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SWITCH }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
