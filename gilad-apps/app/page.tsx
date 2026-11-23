"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "mvp" | "business">("all");

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeSplash(true);
    }, 1800);

    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[#0b0c10] text-white font-sans">
      {/* ================= SPLASH SCREEN ================= */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-50 bg-[#0b0c10] flex flex-col items-center justify-between py-12 px-6 transition-opacity duration-500 ${
            fadeSplash ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div />

          {/* אייקון מרכזי עם מסגרת מסתובבת */}
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center mb-6">
              {/* מסגרת חיצונית מסתובבת */}
              <div className="absolute inset-0 rounded-3xl border-2 border-amber-500/20 border-t-amber-400 border-r-amber-400 animate-spin-slow" />
              {/* ריבוע פנימי */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.4)] animate-pulse-glow">
                <span className="text-slate-950 font-black text-2xl tracking-tighter" dir="ltr">
                  &lt;/&gt;
                </span>
              </div>
            </div>

            <h1 className="text-2xl font-black tracking-wide text-white mb-2">
              גילעד קרליבך
            </h1>
            <p className="text-sm text-slate-400 animate-pulse">
              טוען את האתר...
            </p>
          </div>

          {/* חתימה תחתונה */}
          <div className="px-5 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono tracking-wider text-slate-300" dir="ltr">
            MADE BY <span className="text-amber-400 font-bold">gilad_c</span>
          </div>
        </div>
      )}

      {/* ================= TOP BANNER ================= */}
      <div className="bg-[#16181f] border-b border-white/10 py-2 px-4 text-center text-xs text-amber-400 font-medium">
        ⚡ פיתוח אפליקציות ומערכות חכמות לעסקים מתחילים • ליווי אישי מקצה לקצה
      </div>

      {/* ================= HEADER (APP STYLE) ================= */}
      <header className="sticky top-0 z-40 bg-[#0b0c10]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-amber-500/20" dir="ltr">
              &lt;/&gt;
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight text-white">
                גילעד קרליבך
              </h2>
              <p className="text-xs text-slate-400">
                פיתוח אפליקציות לעסקים מתחילים
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:0527431770"
              className="w-10 h-10 rounded-xl bg-[#16181f] border border-white/10 flex items-center justify-center text-sm hover:border-amber-400/50 transition"
              title="התקשר עכשיו"
            >
              📞
            </a>
            <a
              href="https://wa.me/972527431770"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-md shadow-amber-500/20"
            >
              דבר איתי
            </a>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-20">
        {/* כרטיס קריאה לפעולה מהיר (כמו כרטיס ההזמנה המהירה) */}
        <section className="rounded-2xl bg-gradient-to-l from-amber-500/15 via-[#16181f] to-[#16181f] border border-amber-500/30 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 block mb-1">
                ⚡ הפוך את הרעיון שלך לאפליקציה עובדת
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">
                אפליקציות ואתרים ברמה גבוהה לעסקים בתחילת הדרך
              </h1>
            </div>
            <a
              href="https://wa.me/972527431770"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm px-5 py-3 rounded-xl text-center transition shadow-lg shadow-amber-500/20"
            >
              קבע שיחת אפיון 📱
            </a>
          </div>
        </section>

        {/* כפתורי סינון קטגוריות (Pills כמו באפליקציה) */}
        <section className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-amber-400 text-slate-950"
                : "bg-[#16181f] text-slate-300 border border-white/10 hover:border-white/25"
            }`}
          >
            הכל
          </button>
          <button
            onClick={() => setSelectedCategory("mvp")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
              selectedCategory === "mvp"
                ? "bg-amber-400 text-slate-950"
                : "bg-[#16181f] text-slate-300 border border-white/10 hover:border-white/25"
            }`}
          >
            פיתוח MVP וסטארטאפים
          </button>
          <button
            onClick={() => setSelectedCategory("business")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
              selectedCategory === "business"
                ? "bg-amber-400 text-slate-950"
                : "bg-[#16181f] text-slate-300 border border-white/10 hover:border-white/25"
            }`}
          >
            מערכות ניהול ותורים
          </button>
        </section>

        {/* רשימת שירותים בסגנון כרטיסי בחירה */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">שירותי פיתוח</h3>
            <span className="text-xs text-slate-400">התאמה אישית מלאה</span>
          </div>

          {(selectedCategory === "all" || selectedCategory === "mvp") && (
            <div className="bg-[#16181f] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 transition flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-400/15 text-amber-400 font-bold">
                    מומלץ למתחילים
                  </span>
                </div>
                <h4 className="font-bold text-base text-white">
                  פיתוח MVP ראשוני (גרסת השקה)
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  בניית אפליקציה עובדת ומהירה לבדיקת הרעיון מול לקוחות אמיתיים ומשקיעים בזמן שיא.
                </p>
              </div>
              <a
                href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לשמוע%20על%20פיתוח%20MVP"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#222530] hover:bg-amber-400 hover:text-slate-950 text-amber-400 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-amber-400/30 transition"
              >
                פרטים ←
              </a>
            </div>
          )}

          {(selectedCategory === "all" || selectedCategory === "business") && (
            <div className="bg-[#16181f] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 transition flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-base text-white">
                  אפליקציות ניהול, תורים והזמנות
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  מערכות מותאמות אישית לעסקים (מספרות, בתי קפה, קליניקות ונותני שירות) שחוסכות זמן ומגדילות מכירות.
                </p>
              </div>
              <a
                href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לשמוע%20על%20אפליקציה%20לעסק"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#222530] hover:bg-amber-400 hover:text-slate-950 text-amber-400 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-amber-400/30 transition"
              >
                פרטים ←
              </a>
            </div>
          )}

          {selectedCategory === "all" && (
            <div className="bg-[#16181f] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 transition flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-base text-white">
                  אתרי תדמית ודפי נחיתה מהירים
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  עיצוב מודרני מותאם מובייל ב-100%, טעינה מיידית וחיבור ישיר לוואטסאפ ולמערכות העסק.
                </p>
              </div>
              <a
                href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לשמוע%20על%20בניית%20אתר"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#222530] hover:bg-amber-400 hover:text-slate-950 text-amber-400 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-amber-400/30 transition"
              >
                פרטים ←
              </a>
            </div>
          )}
        </section>

        {/* דוגמאות מפרויקטים קיימים */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">פרויקטים נבחרים</h3>
            <span className="text-xs text-amber-400">מערכות חיות</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#16181f] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">☕</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                  באוויר
                </span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1">עגלת הקפה</h4>
              <p className="text-xs text-slate-400">
                אפליקציית הזמנות, תפריט חכם, התאמה אישית של משקאות ואיסוף מהיר.
              </p>
            </div>

            <div className="bg-[#16181f] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">✂️</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                  באוויר
                </span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1">המספרה — ניהול תורים</h4>
              <p className="text-xs text-slate-400">
                מערכת קביעת תורים ב-3 שלבים פשוטים, בחירת טיפול וניהול יומן לקוחות.
              </p>
            </div>
          </div>
        </section>

        {/* כרטיס יצירת קשר */}
        <section id="contact" className="bg-[#16181f] border border-white/10 rounded-2xl p-6 text-center space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold">
            מוכנים להתחיל?
          </div>
          <h3 className="text-2xl font-black text-white">גילעד קרליבך</h3>
          <p className="text-sm text-slate-400">
            פיתוח אפליקציות לעסקים מתחילים
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href="https://wa.me/972527431770"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm transition"
            >
              וואטסאפ: 052-7431770
            </a>
            <a
              href="mailto:gilad.creating.apps@gmail.com"
              className="bg-[#222530] hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition"
            >
              gilad.creating.apps@gmail.com
            </a>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-6 text-center space-y-2">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-400" dir="ltr">
          MADE BY <span className="text-amber-400 font-bold">gilad_c</span>
        </div>
        <p className="text-xs text-slate-500">
          © 2026 גילעד קרליבך — כל הזכויות שמורות
        </p>
      </footer>
    </div>
  );
}