"use client";

import { useState, useEffect } from "react";
import SiteTools, { AccentColor, Language } from "./SiteTools";

export default function Home() {
  // Splash Screen
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  // Light / Dark Mode
  const [isDark, setIsDark] = useState(true);

  // Accent Color & Language (from SiteTools)
  const [accent, setAccent] = useState<AccentColor>("amber");
  const [lang, setLang] = useState<Language>("he");

  // Category Filter
  const [selectedCategory, setSelectedCategory] = useState<"all" | "mvp" | "business">("all");

  // Business Card Flip
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardImgError, setCardImgError] = useState(false);

  // Lead Form State
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadBusiness, setLeadBusiness] = useState("");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeSplash(true), 1700);
    const hideTimer = setTimeout(() => setShowSplash(false), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;
    const msg =
      lang === "he"
        ? `היי גילעד, השארתי פרטים באתר:\n• שם: ${leadName}\n• טלפון: ${leadPhone}\n• תחום העסק: ${leadBusiness || "לא צוין"}`
        : `Hi Gilad, I left my details on your site:\n• Name: ${leadName}\n• Phone: ${leadPhone}\n• Business: ${leadBusiness || "Not specified"}`;
    window.open(`https://wa.me/972527431770?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // מיפוי צבעים דינמי לפי הבחירה ב-Theme Accent Picker
  const accentStyles: Record<
    AccentColor,
    {
      btn: string;
      text: string;
      badge: string;
      border: string;
      heroBg: string;
      spinBorder: string;
    }
  > = {
    amber: {
      btn: "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20",
      text: "text-amber-400",
      badge: "bg-amber-400/15 text-amber-400 border-amber-400/30",
      border: "border-amber-400/40",
      heroBg: isDark
        ? "bg-gradient-to-l from-amber-500/15 via-[#16181f] to-[#16181f] border-amber-500/30"
        : "bg-gradient-to-l from-amber-100 via-white to-white border-amber-300",
      spinBorder: "border-amber-500/20 border-t-amber-400 border-r-amber-400",
    },
    cyan: {
      btn: "bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-cyan-500/20",
      text: "text-cyan-400",
      badge: "bg-cyan-400/15 text-cyan-400 border-cyan-400/30",
      border: "border-cyan-400/40",
      heroBg: isDark
        ? "bg-gradient-to-l from-cyan-500/15 via-[#16181f] to-[#16181f] border-cyan-500/30"
        : "bg-gradient-to-l from-cyan-100 via-white to-white border-cyan-300",
      spinBorder: "border-cyan-500/20 border-t-cyan-400 border-r-cyan-400",
    },
    purple: {
      btn: "bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/20",
      text: "text-purple-400",
      badge: "bg-purple-500/15 text-purple-400 border-purple-400/30",
      border: "border-purple-400/40",
      heroBg: isDark
        ? "bg-gradient-to-l from-purple-500/15 via-[#16181f] to-[#16181f] border-purple-500/30"
        : "bg-gradient-to-l from-purple-100 via-white to-white border-purple-300",
      spinBorder: "border-purple-500/20 border-t-purple-400 border-r-purple-400",
    },
    emerald: {
      btn: "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-500/20",
      text: "text-emerald-400",
      badge: "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
      border: "border-emerald-400/40",
      heroBg: isDark
        ? "bg-gradient-to-l from-emerald-500/15 via-[#16181f] to-[#16181f] border-emerald-500/30"
        : "bg-gradient-to-l from-emerald-100 via-white to-white border-emerald-300",
      spinBorder: "border-emerald-500/20 border-t-emerald-400 border-r-emerald-400",
    },
  };

  const theme = accentStyles[accent];
  const bgMain = isDark ? "bg-[#0b0c10] text-white" : "bg-slate-100 text-slate-900";
  const bgCard = isDark ? "bg-[#16181f] border-white/10" : "bg-white border-slate-200 shadow-sm";
  const bgSubCard = isDark ? "bg-[#222530] border-white/10" : "bg-slate-100 border-slate-200";
  const textMuted = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div
      dir={lang === "he" ? "rtl" : "ltr"}
      className={`min-h-screen transition-colors duration-300 font-sans pb-24 ${bgMain}`}
    >
      {/* ================= SPLASH SCREEN ================= */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-50 bg-[#0b0c10] text-white flex flex-col items-center justify-between py-12 px-6 transition-opacity duration-500 ${
            fadeSplash ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div />
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center mb-6">
              <div className={`absolute inset-0 rounded-3xl border-2 animate-spin-slow ${theme.spinBorder}`} />
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow ${theme.btn}`}>
                <span className="font-black text-2xl tracking-tighter" dir="ltr">
                  &lt;/&gt;
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-wide text-white mb-2">
              {lang === "he" ? "גילעד קרליבך" : "Gilad Karlibach"}
            </h1>
            <p className="text-sm text-slate-400 animate-pulse">
              {lang === "he" ? "טוען את האתר..." : "Loading..."}
            </p>
          </div>
          <div
            className="px-5 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono tracking-wider text-slate-300"
            dir="ltr"
          >
            MADE BY <span className={`font-bold ${theme.text}`}>gilad_c</span>
          </div>
        </div>
      )}

      {/* ================= TOP BANNER ================= */}
      <div
        className={`border-b py-2 px-4 text-center text-xs font-medium ${
          isDark ? `bg-[#16181f] border-white/10 ${theme.text}` : `${theme.btn} border-black/10`
        }`}
      >
        {lang === "he"
          ? "⚡ פיתוח אפליקציות ומערכות חכמות לעסקים מתחילים • ליווי אישי מקצה לקצה"
          : "⚡ Smart App & Web Development for Startups • End-to-End Personal Guidance"}
      </div>

      {/* ================= HEADER (APP STYLE) ================= */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          isDark ? "bg-[#0b0c10]/90 border-white/10" : "bg-white/90 border-slate-200"
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg shadow-md shrink-0 ${theme.btn}`}
              dir="ltr"
            >
              &lt;/&gt;
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">
                {lang === "he" ? "גילעד קרליבך" : "Gilad Karlibach"}
              </h2>
              <p className={`text-xs ${textMuted}`}>
                {lang === "he"
                  ? "פיתוח אפליקציות לעסקים מתחילים"
                  : "App Development for Startups"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* כפתור מצב בהיר / כהה */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${bgCard}`}
              title={lang === "he" ? "החלף ערכת נושא" : "Toggle Theme"}
            >
              <span>{isDark ? "☀️" : "🌙"}</span>
              <span>{isDark ? (lang === "he" ? "בהיר" : "Light") : lang === "he" ? "כהה" : "Dark"}</span>
            </button>

            <a
              href="https://wa.me/972527431770"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition shadow-md shrink-0 ${theme.btn}`}
            >
              {lang === "he" ? "דבר איתי" : "Contact"}
            </a>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main id="top" className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* כרטיס כותרת מרכזי */}
        <section className={`rounded-2xl border p-5 shadow-sm ${theme.heroBg}`}>
          <span className={`text-xs font-bold block mb-1 ${theme.text}`}>
            {lang === "he"
              ? "⚡ הפוך את הרעיון שלך לאפליקציה עובדת"
              : "⚡ Turn your idea into a working app"}
          </span>
          <h1 className="text-xl sm:text-2xl font-black leading-snug">
            {lang === "he"
              ? "אפליקציות ואתרים ברמה גבוהה לעסקים בתחילת הדרך"
              : "High-End Apps & Websites for Early-Stage Businesses"}
          </h1>
        </section>

        {/* ================= קובץ הכלים החכמים (SiteTools) ================= */}
        <SiteTools
          accent={accent}
          setAccent={setAccent}
          lang={lang}
          setLang={setLang}
          isDark={isDark}
        />

        {/* ================= כרטיס ביקור אינטראקטיבי מתהפך ================= */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">
              {lang === "he" ? "כרטיס הביקור הדיגיטלי" : "Digital Business Card"}
            </h3>
            <button
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className={`text-xs font-bold hover:underline cursor-pointer ${theme.text}`}
            >
              {lang === "he" ? "🔄 לחץ להיפוך הכרטיס" : "🔄 Flip Card"}
            </button>
          </div>

          <div
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            className="cursor-pointer select-none group"
          >
            {!isCardFlipped ? (
              <div className={`relative rounded-2xl overflow-hidden border shadow-xl aspect-[3/2] bg-gradient-to-br from-[#0a1128] via-[#121d42] to-[#080d21] ${theme.border}`}>
                {!cardImgError ? (
                  <img
                    src="/gilad.app/business-card.jpg"
                    alt="כרטיס ביקור גילעד קרליבך"
                    onError={() => setCardImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full p-6 flex flex-col justify-between text-white relative">
                    <div className="flex justify-between items-start">
                      <span
                        className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono"
                        dir="ltr"
                      >
                        &lt;/&gt; APP DEV
                      </span>
                      <span className="text-xs text-slate-400">
                        {lang === "he" ? "לחץ להיפוך ↻" : "Tap to flip ↻"}
                      </span>
                    </div>
                    <div className={lang === "he" ? "text-right" : "text-left"}>
                      <h4 className="text-2xl sm:text-3xl font-black text-white">
                        {lang === "he" ? "גילעד קרליבך" : "Gilad Karlibach"}
                      </h4>
                      <p className="text-cyan-400 font-medium text-sm sm:text-base">
                        {lang === "he"
                          ? "פיתוח אפליקציות לעסקים מתחילים"
                          : "App Development for Startups"}
                      </p>
                    </div>
                    <div className="text-left text-xs sm:text-sm text-slate-300 space-y-0.5" dir="ltr">
                      <p>✉️ gilad.creating.apps@gmail.com</p>
                      <p>📞 0527431770</p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-lg border border-white/15">
                  {lang === "he" ? "לחץ לצד האחורי ↻" : "Tap for back side ↻"}
                </div>
              </div>
            ) : (
              <div className={`rounded-2xl border shadow-xl aspect-[3/2] bg-gradient-to-br from-[#16181f] to-[#0b0c10] text-white p-6 flex flex-col justify-between ${theme.border}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${theme.text}`}>
                    {lang === "he" ? "למה לבחור בי לעסק שלך?" : "Why work with me?"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === "he" ? "לחץ לחזרה ↺" : "Tap to return ↺"}
                  </span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  <li>
                    {lang === "he"
                      ? "✅ פיתוח מהיר מותאם לתקציב של עסקים מתחילים"
                      : "✅ Fast development tailored for early-stage businesses"}
                  </li>
                  <li>
                    {lang === "he"
                      ? "✅ ממשק ניהול נוח בעברית מלאה (RTL)"
                      : "✅ Clean & intuitive management dashboard"}
                  </li>
                  <li>
                    {lang === "he"
                      ? "✅ זמינות ישירה בוואטסאפ וליווי אישי"
                      : "✅ Direct WhatsApp availability & personal support"}
                  </li>
                </ul>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className={`text-xs font-mono ${theme.text}`} dir="ltr">
                    052-7431770
                  </span>
                  <span className="text-xs text-slate-400" dir="ltr">
                    gilad.creating.apps@gmail.com
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= שירותים וסינון ================= */}
        <section id="services" className="space-y-3 scroll-mt-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">
              {lang === "he" ? "שירותי פיתוח" : "Development Services"}
            </h3>
            <span className={`text-xs ${textMuted}`}>
              {lang === "he" ? "התאמה אישית מלאה" : "100% Custom Built"}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedCategory === "all" ? theme.btn : `${bgCard} border`
              }`}
            >
              {lang === "he" ? "הכל" : "All"}
            </button>
            <button
              onClick={() => setSelectedCategory("mvp")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedCategory === "mvp" ? theme.btn : `${bgCard} border`
              }`}
            >
              {lang === "he" ? "פיתוח MVP וסטארטאפים" : "MVP & Startups"}
            </button>
            <button
              onClick={() => setSelectedCategory("business")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedCategory === "business" ? theme.btn : `${bgCard} border`
              }`}
            >
              {lang === "he" ? "מערכות ניהול ותורים" : "Booking & Management"}
            </button>
          </div>

          {(selectedCategory === "all" || selectedCategory === "mvp") && (
            <div className={`border rounded-2xl p-4 transition flex items-center justify-between gap-4 ${bgCard}`}>
              <div className="space-y-1">
                <span className={`text-xs px-2.5 py-0.5 rounded-md font-bold border ${theme.badge}`}>
                  {lang === "he" ? "מומלץ למתחילים" : "Best for Startups"}
                </span>
                <h4 className="font-bold text-base">
                  {lang === "he" ? "פיתוח MVP ראשוני (גרסת השקה)" : "Initial MVP Launch Version"}
                </h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  {lang === "he"
                    ? "בניית אפליקציה עובדת ומהירה לבדיקת הרעיון מול לקוחות אמיתיים ומשקיעים בזמן שיא."
                    : "Build a fast, working app to validate your idea with real customers and investors."}
                </p>
              </div>
              <a
                href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לשמוע%20על%20פיתוח%20MVP"
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 font-bold text-xs px-3.5 py-2.5 rounded-xl border transition ${bgSubCard} ${theme.text} ${theme.border}`}
              >
                {lang === "he" ? "פרטים ←" : "Details →"}
              </a>
            </div>
          )}

          {(selectedCategory === "all" || selectedCategory === "business") && (
            <div className={`border rounded-2xl p-4 transition flex items-center justify-between gap-4 ${bgCard}`}>
              <div className="space-y-1">
                <h4 className="font-bold text-base">
                  {lang === "he"
                    ? "אפליקציות ניהול, תורים והזמנות"
                    : "Booking, Ordering & Management Apps"}
                </h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  {lang === "he"
                    ? "מערכות מותאמות אישית לעסקים (מספרות, בתי קפה, קליניקות, נותני שירות ועוד...) שחוסכות זמן ומגדילות מכירות."
                    : "Custom systems for barbershops, coffee carts, clinics, service providers and more..."}
                </p>
              </div>
              <a
                href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לשמוע%20על%20אפליקציה%20לעסק"
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 font-bold text-xs px-3.5 py-2.5 rounded-xl border transition ${bgSubCard} ${theme.text} ${theme.border}`}
              >
                {lang === "he" ? "פרטים ←" : "Details →"}
              </a>
            </div>
          )}

          {selectedCategory === "all" && (
            <div className={`border rounded-2xl p-4 transition flex items-center justify-between gap-4 ${bgCard}`}>
              <div className="space-y-1">
                <h4 className="font-bold text-base">
                  {lang === "he"
                    ? "אתרי תדמית, דפי נחיתה ועוד..."
                    : "Landing Pages, Business Sites & More..."}
                </h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  {lang === "he"
                    ? "עיצוב מודרני מותאם מובייל ב-100%, טעינה מיידית וחיבור ישיר לוואטסאפ ולמערכות העסק."
                    : "Modern 100% mobile-friendly design with instant loading and direct WhatsApp integration."}
                </p>
              </div>
              <a
                href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לשמוע%20על%20בניית%20אתר"
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 font-bold text-xs px-3.5 py-2.5 rounded-xl border transition ${bgSubCard} ${theme.text} ${theme.border}`}
              >
                {lang === "he" ? "פרטים ←" : "Details →"}
              </a>
            </div>
          )}
        </section>

        {/* ================= פרויקטים נבחרים ================= */}
        <section id="projects" className="space-y-3 scroll-mt-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">
              {lang === "he" ? "פרויקטים נבחרים" : "Featured Projects"}
            </h3>
            <span className={`text-xs font-medium ${theme.text}`}>
              {lang === "he" ? "מערכות חיות" : "Live Systems"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={`border rounded-2xl p-4 ${bgCard}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">☕</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">
                  {lang === "he" ? "באוויר" : "Live"}
                </span>
              </div>
              <h4 className="font-bold text-sm mb-1">
                {lang === "he" ? "עגלת הקפה" : "Coffee Cart App"}
              </h4>
              <p className={`text-xs ${textMuted}`}>
                {lang === "he"
                  ? "אפליקציית הזמנות, תפריט חכם, התאמה אישית של משקאות ואיסוף מהיר."
                  : "Smart menu ordering app with custom drink options and quick pickup."}
              </p>
            </div>

            <div className={`border rounded-2xl p-4 ${bgCard}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">✂️</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">
                  {lang === "he" ? "באוויר" : "Live"}
                </span>
              </div>
              <h4 className="font-bold text-sm mb-1">
                {lang === "he" ? "המספרה — ניהול תורים" : "Barbershop Booking"}
              </h4>
              <p className={`text-xs ${textMuted}`}>
                {lang === "he"
                  ? "מערכת קביעת תורים ב-3 שלבים פשוטים, בחירת טיפול וניהול יומן לקוחות."
                  : "3-step appointment booking system with service selection and calendar management."}
              </p>
            </div>
          </div>
        </section>

        {/* ================= טופס השאר פרטים ונחזור אליך ================= */}
        <section id="contact" className={`border rounded-2xl p-6 space-y-4 scroll-mt-20 ${bgCard}`}>
          <div className="text-center space-y-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}>
              {lang === "he" ? "מוכנים להתחיל?" : "Ready to start?"}
            </span>
            <h3 className="text-xl font-black">
              {lang === "he" ? "השאר פרטים ונחזור אליך" : "Leave Details & I'll Get Back to You"}
            </h3>
            <p className={`text-xs ${textMuted}`}>
              {lang === "he"
                ? "מלא פרטים קצרים וההודעה תישלח אליי ישירות לוואטסאפ"
                : "Fill in your details and send directly to my WhatsApp"}
            </p>
          </div>

          <form onSubmit={handleLeadSubmit} className="space-y-3">
            <input
              type="text"
              required
              placeholder={lang === "he" ? "השם שלך *" : "Your Name *"}
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${bgSubCard}`}
            />

            <input
              type="tel"
              required
              placeholder={lang === "he" ? "מספר טלפון לחזרה *" : "Phone Number *"}
              value={leadPhone}
              onChange={(e) => setLeadPhone(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${bgSubCard}`}
            />

            <input
              type="text"
              placeholder={
                lang === "he"
                  ? "סוג העסק / הרעיון לאפליקציה (אופציונלי)"
                  : "Business Type / App Idea (Optional)"
              }
              value={leadBusiness}
              onChange={(e) => setLeadBusiness(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${bgSubCard}`}
            />

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              {lang === "he" ? "שלח פרטים לוואטסאפ 🚀" : "Send to WhatsApp 🚀"}
            </button>
          </form>

          <div
            className={`pt-3 border-t text-center text-xs space-y-1 ${
              isDark ? "border-white/10" : "border-slate-200"
            } ${textMuted}`}
          >
            <p>
              {lang === "he" ? "טלפון ישיר:" : "Direct Phone:"}{" "}
              <a href="tel:0527431770" className={`font-bold hover:underline ${theme.text}`} dir="ltr">
                052-7431770
              </a>
            </p>
            <p>
              {lang === "he" ? "מייל:" : "Email:"}{" "}
              <a href="mailto:gilad.creating.apps@gmail.com" className={`font-bold hover:underline ${theme.text}`}>
                gilad.creating.apps@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="pt-4 pb-6 text-center space-y-2">
          <div
            className={`inline-block px-4 py-1.5 rounded-full border text-xs font-mono ${bgCard} ${textMuted}`}
            dir="ltr"
          >
            MADE BY <span className={`font-bold ${theme.text}`}>gilad_c</span>
          </div>
          <p className={`text-xs ${textMuted}`}>
            {lang === "he"
              ? "© 2026 גילעד קרליבך — כל הזכויות שמורות"
              : "© 2026 Gilad Karlibach — All Rights Reserved"}
          </p>
        </footer>
      </main>

      {/* ================= כפתור וואטסאפ צף בפינה התחתונה ================= */}
      <a
        href="https://wa.me/972527431770"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-20 left-4 z-40 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 transition transform hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
          <path d="M16 3C8.832 3 3 8.832 3 16c0 2.294.602 4.532 1.745 6.505L3 29l6.678-1.718A12.93 12.93 0 0 0 16 29c7.168 0 13-5.832 13-13S23.168 3 16 3zm0 23.6c-2.01 0-3.98-.54-5.7-1.56l-.41-.24-3.96 1.02 1.06-3.86-.27-.42A10.55 10.55 0 0 1 5.4 16c0-5.845 4.755-10.6 10.6-10.6S26.6 10.155 26.6 16 21.845 26.6 16 26.6zm5.81-7.94c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </a>

      {/* ================= תפריט ניווט תחתון (BOTTOM TAB BAR) ================= */}
      <nav
        className={`fixed bottom-0 inset-x-0 z-40 border-t backdrop-blur-lg ${
          isDark ? "bg-[#0b0c10]/95 border-white/10" : "bg-white/95 border-slate-200"
        }`}
      >
        <div className="max-w-2xl mx-auto grid grid-cols-4 py-2 px-2 text-center">
          <a href="#top" className={`flex flex-col items-center gap-0.5 py-1 font-bold text-[11px] ${theme.text}`}>
            <span className="text-base">🏠</span>
            <span>{lang === "he" ? "ראשי" : "Home"}</span>
          </a>
          <a href="#services" className={`flex flex-col items-center gap-0.5 py-1 text-[11px] transition ${textMuted}`}>
            <span className="text-base">⚡</span>
            <span>{lang === "he" ? "שירותים" : "Services"}</span>
          </a>
          <a href="#projects" className={`flex flex-col items-center gap-0.5 py-1 text-[11px] transition ${textMuted}`}>
            <span className="text-base">📱</span>
            <span>{lang === "he" ? "פרויקטים" : "Projects"}</span>
          </a>
          <a href="#contact" className={`flex flex-col items-center gap-0.5 py-1 text-[11px] transition ${textMuted}`}>
            <span className="text-base">💬</span>
            <span>{lang === "he" ? "צור קשר" : "Contact"}</span>
          </a>
        </div>
      </nav>
    </div>
  );
}