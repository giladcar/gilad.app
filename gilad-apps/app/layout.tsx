import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({ subsets: ["hebrew", "latin"] });

export const metadata: Metadata = {
  title: "גילעד קרליבך | פיתוח אפליקציות לעסקים מתחילים",
  description: "הופכים רעיונות לאפליקציות עובדות - פיתוח MVP ואפליקציות מותאמות אישית לעסקים מתחילים.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.className} bg-slate-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}