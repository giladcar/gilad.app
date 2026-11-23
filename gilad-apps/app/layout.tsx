import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0b0c10",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "גילעד קרליבך | יוצר אפליקציות לעסקים",
  description: "פיתוח אפליקציות ומערכות חכמות לעסקים",
  manifest: "/gilad.app/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "גילעד אפליקציות",
  },
  icons: {
    icon: "/gilad.app/icon-192.png",
    apple: "/gilad.app/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="manifest" href="/gilad.app/manifest.json" />
        <meta name="theme-color" content="#0b0c10" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0c10] text-white`}
      >
        {children}
      </body>
    </html>
  );
}