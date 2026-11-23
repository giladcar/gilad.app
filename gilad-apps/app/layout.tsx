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
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" async />
        <style>{`
          @keyframes spinSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.8; transform: scale(0.98); }
            50% { opacity: 1; transform: scale(1.03); }
          }
          .animate-spin-slow { animation: spinSlow 3s linear infinite; }
          .animate-pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
          body { background-color: #0b0c10; color: #ffffff; margin: 0; }
        `}</style>
      </head>
      <body className={`${heebo.className} bg-[#0b0c10] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}