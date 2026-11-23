"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // Splash Screen
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  // Light / Dark Mode
  const [isDark, setIsDark] = useState(true);

  // Category Filter
  const [selectedCategory, setSelectedCategory] = useState<"all" | "mvp" | "business">("all");

  // Business Card Flip
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardImgError, setCardImgError] = useState(false);

  // Cost & Time Calculator State
  const [appType, setAppType] = useState<"landing" | "booking" | "mvp">("booking");
  const [hasAdmin, setHasAdmin] = useState(true);
  const [hasPayments, setHasPayments] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

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

  // חישוב הערכת מחיר וזמן דינמית
  const calculateEstimate = () => {
    let minPrice = 0;
    let maxPrice = 0;
    let weeks = "";

    if (appType === "landing") {
      minPrice = 1500;
      maxPrice = 2800;
      weeks = "1 - 2 שבועות";
    } else if (appType === "booking") {
      minPrice = 3500;
      maxPrice = 6000;
      weeks = "2 - 4 שבועות";
    } else {
      minPrice = 6000;
      maxPrice = 11000;
      weeks = "4 - 7 שבועות";
    }

    if (hasAdmin) {
      minPrice += 1000;
      maxPrice += 1800;
    }
    if (hasPayments) {
      minPrice += 1200;
      maxPrice += 2000;
    }
    if (hasNotifications) {
      minPrice += 600;
      maxPrice += 1000;
    }

    return {
      priceRange: `₪${minPrice.toLocaleString()} - ₪${maxPrice.toLocaleString()}`,
      weeks,
    };
  };

  const estimate = calculateEstimate();

  const handleSendCalculatorToWhatsApp = () => {
    const typeLabel =
      appType === "landing"
        ? "אתר תדמית / דף נחיתה"
        : appType === "booking"
        ? "אפליקציית תורים / הזמנות"
        : "אפליקציית MVP מלאה";
    const extras = [
      hasAdmin ? "פאנל ניהול" : null,
      hasPayments ? "סליקת אשראי" : null,
      hasNotifications ? "התראות WhatsApp/SMS" : null,
    ]
      .filter(Boolean)
      .join(", ");

    const msg = `היי גילעד! בדקתי במחשבון באתר:\n• סוג פרויקט: ${typeLabel}\n• תוספות: ${extras || "ללא תוספות"}\n• הערכה: ${estimate.priceRange} (${estimate.weeks})\nאשמח שנמשיך משם!`;
    window.open(`https://wa.me/972527431770?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;
    const msg = `היי גילעד, השארתי פרטים באתר:\n• שם: ${leadName}\n• טלפון: ${leadPhone}\n• תחום העסק: ${leadBusiness || "לא צוין"}`;
    window.open(`https://wa.me/972527431770?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // עיצוב דינמי למצב כהה / בהיר
  const bgMain = isDark ? "bg-[#0b0c10] text-white" : "bg-slate-100 text-slate-900";
  const bgCard = isDark ? "bg-[#16181f] border-white/10" : "bg-white border-slate-200 shadow-sm";
  const bgSubCard = isDark ? "bg-[#222530] border-white/10" : "bg-slate-100 border-slate-200";
  const textMuted = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div dir="rtl" className={`min-h-screen transition-colors duration-300 font-sans pb-24 ${bgMain}`}>
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
              <div className="absolute inset-0 rounded-3xl border-2 border-amber-500/20 border-t-amber-400 border-r-amber-400 animate-spin-slow" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.4)] animate-pulse-glow">
                <span className="text-slate-950 font-black text-2xl tracking-tighter" dir="ltr">
                  &lt;/&gt;
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-wide text-white mb-2">
              גילעד קרליבך
            </h1>
            <p className="text-sm text-slate-400 animate-pulse">טוען את האתר...</p>
          </div>
          <div
            className="px-5 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono tracking-wider text-slate-300"
            dir="ltr"
          >
            MADE BY <span className="text-amber-400 font-bold">gilad_c</span>
          </div>
        </div>
      )}

      {/* ================= TOP BANNER ================= */}
      <div
        className={`border-b py-2 px-4 text-center text-xs font-medium ${
          isDark
            ? "bg-[#16181f] border-white/10 text-amber-400"
            : "bg-amber-500 text-slate-950 font-bold border-amber-600/20"
        }`}
      >
        ⚡ פיתוח אפליקציות ומערכות חכמות לעסקים מתחילים • ליווי אישי מקצה לקצה
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
              className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-amber-500/20 shrink-0"
              dir="ltr"
            >
              &lt;/&gt;
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">גילעד קרליבך</h2>
              <p className={`text-xs ${textMuted}`}>פיתוח אפליקציות לעסקים מתחילים</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* כפתור מצב בהיר / כהה (כמו בעגלת הקפה) */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${bgCard}`}
              title="החלף ערכת נושא"
            >
              <span>{isDark ? "☀️" : "🌙"}</span>
              <span>{isDark ? "בהיר" : "כהה"}</span>
            </button>

            <a
              href="https://wa.me/972527431770"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition shadow-md shadow-amber-500/20 shrink-0"
            >
              דבר איתי
            </a>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main id="top" className="max-w-2xl mx-auto px-4 py-6 space-y-7">
        {/* כרטיס כותרת מרכזי */}
        <section
          className={`rounded-2xl border p-5 ${
            isDark
              ? "bg-gradient-to-l from-amber-500/15 via-[#16181f] to-[#16181f] border-amber-500/30"
              : "bg-gradient-to-l from-amber-100 via-white to-white border-amber-300 shadow-sm"
          }`}
        >
          <span className="text-xs font-bold text-amber-500 block mb-1">
            ⚡ הפוך את הרעיון שלך לאפליקציה עובדת
          </span>
          <h1 className="text-xl sm:text-2xl font-black leading-snug">
            אפליקציות ואתרים ברמה גבוהה לעסקים בתחילת הדרך
          </h1>
        </section>

        {/* ================= כרטיס ביקור אינטראקטיבי מתהפך ================= */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">כרטיס הביקור הדיגיטלי</h3>
            <button
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="text-xs text-amber-500 font-bold hover:underline cursor-pointer"
            >
              🔄 לחץ להיפוך הכרטיס
            </button>
          </div>

          <div
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            className="cursor-pointer select-none group"
          >
            {!isCardFlipped ? (
              /* צד קדמי: התמונה שיצרנו (או תצוגה חלופית מעוצבת אם הקובץ עדיין לא בתיקייה) */
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl aspect-[3/2] bg-gradient-to-br from-[#0a1128] via-[#121d42] to-[#080d21]">
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
                      <span className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono" dir="ltr">
                        &lt;/&gt; APP DEV
                      </span>
                      <span className="text-xs text-slate-400">לחץ להיפוך ↻</span>
                    </div>
                    <div className="text-right">
                      <h4 className="text-2xl sm:text-3xl font-black text-white">גילעד קרליבך</h4>
                      <p className="text-cyan-400 font-medium text-sm sm:text-base">
                        פיתוח אפליקציות לעסקים מתחילים
                      </p>
                    </div>
                    <div className="text-left text-xs sm:text-sm text-slate-300 space-y-0.5" dir="ltr">
                      <p>✉️ gilad.creating.apps@gmail.com</p>
                      <p>📞 0527431770</p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-lg border border-white/15">
                  לחץ לצד האחורי ↻
                </div>
              </div>
            ) : (
              /* צד אחורי: פרטים מהירים וקוד QR / שמירת איש קשר */
              <div className="rounded-2xl border border-amber-400/50 shadow-xl aspect-[3/2] bg-gradient-to-br from-[#16181f] to-[#0b0c10] text-white p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">
                    למה לבחור בי לעסק שלך?
                  </span>
                  <span className="text-xs text-slate-400">לחץ לחזרה ↺</span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  <li>✅ פיתוח מהיר מותאם לתקציב של עסקים מתחילים</li>
                  <li>✅ ממשק ניהול נוח בעברית מלאה (RTL)</li>
                  <li>✅ זמינות ישירה בוואטסאפ וליווי אישי</li>
                </ul>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs font-mono text-amber-400" dir="ltr">
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
            <h3 className="text-lg font-bold">שירותי פיתוח</h3>
            <span className={`text-xs ${textMuted}`}>התאמה אישית מלאה</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-amber-400 text-slate-950"
                  : `${bgCard} border`
              }`}
            >
              הכל
            </button>
            <button
              onClick={() => setSelectedCategory("mvp")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedCategory === "mvp"
                  ? "bg-amber-400 text-slate-950"
                  : `${bgCard} border`
              }`}
            >
              פיתוח MVP וסטארטאפים
            </button>
            <button
              onClick={() => setSelectedCategory("business")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedCategory === "business"
                  ? "bg-amber-400 text-slate-950"
                  : `${bgCard} border`
              }`}
            >
              מערכות ניהול ותורים
            </button>
          </div>

          {(selectedCategory === "all" || selectedCategory === "mvp") && (
            <div className={`border rounded-2xl p-4 transition flex items-center justify-between gap-4 ${bgCard}`}>
              <div className="space-y-1">
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-400/15 text-amber-500 font-bold">
                  מומלץ למתחילים
                </span>
                <h4 className="font-bold text-base">פיתוח MVP ראשוני (גרסת השקה)</h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  בניית אפליקציה עובדת ומהירה לבדיקת הרעיון מול לקוחות אמיתיים ומשקיעים בזמן שיא.
                </p>
              </div>
              <a
                href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לשמוע%20על%20פיתוח%20MVP"
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 hover:bg-amber-400 hover:text-slate-950 text-amber-500 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-amber-400/30 transition ${bgSubCard}`}
              >
                פרטים ←
              </a>
            </div>
          )}

          {(selectedCategory === "all" || selectedCategory === "business") && (
            <div className={`border rounded-2xl p-4 transition flex items-center justify-between gap-4 ${bgCard}`}>
              <div className="space-y-1">
                <h4 className="font-bold text-base">אפליקציות ניהול, תורים והזמנות</h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  מערכות מותאמות אישית לעסקים (מספרות, בתי קפה, קליניקות, נותני שירות ועוד...) שחוסכות זמן ומגדילות מכירות.
                </p>
              </div>
              <a
                href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לשמוע%20על%20אפליקציה%20לעסק"
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 hover:bg-amber-400 hover:text-slate-950 text-amber-500 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-amber-400/30 transition ${bgSubCard}`}
              >
                פרטים ←
              </a>
            </div>
          )}

          {selectedCategory === "all" && (
            <div className={`border rounded-2xl p-4 transition flex items-center justify-between gap-4 ${bgCard}`}>
              <div className="space-y-1">
                <h4 className="font-bold text-base">אתרי תדמית, דפי נחיתה ועוד...</h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  עיצוב מודרני מותאם מובייל ב-100%, טעינה מיידית וחיבור ישיר לוואטסאפ ולמערכות העסק.
                </p>
              </div>
              <a
                href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לשמוע%20על%20בניית%20אתר"
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 hover:bg-amber-400 hover:text-slate-950 text-amber-500 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-amber-400/30 transition ${bgSubCard}`}
              >
                פרטים ←
              </a>
            </div>
          )}
        </section>

        {/* ================= מחשבון הערכת עלות וזמן ================= */}
        <section id="calculator" className={`border rounded-2xl p-5 space-y-5 scroll-mt-20 ${bgCard}`}>
          <div>
            <span className="text-xs font-bold text-amber-500 block mb-1">
              🧮 מחשבון חכם
            </span>
            <h3 className="text-lg font-black">מחשבון הערכת עלות וזמן פיתוח</h3>
            <p className={`text-xs ${textMuted}`}>
              בחר את סוג הפרויקט והפיצ&apos;רים וקבל הערכה מיידית
            </p>
          </div>

          {/* שאלה 1: סוג האפליקציה */}
          <div className="space-y-2">
            <label className="text-xs font-bold block">1. מה תרצה לבנות?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: "landing", label: "אתר תדמית / נחיתה" },
                { id: "booking", label: "אפליקציית תורים / הזמנות" },
                { id: "mvp", label: "אפליקציית MVP מלאה" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAppType(item.id as "landing" | "booking" | "mvp")}
                  className={`p-3 rounded-xl text-xs font-bold border text-center transition cursor-pointer ${
                    appType === item.id
                      ? "bg-amber-400 text-slate-950 border-amber-400"
                      : `${bgSubCard} hover:border-amber-400/40`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* שאלות 2-4: תוספות */}
          <div className="space-y-2">
            <label className="text-xs font-bold block">2. פיצ&apos;רים נדרשים:</label>
            <div className="space-y-2">
              <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${bgSubCard}`}>
                <span className="text-xs font-medium">פאנל ניהול לעסק (Dashboard)</span>
                <input
                  type="checkbox"
                  checked={hasAdmin}
                  onChange={(e) => setHasAdmin(e.target.checked)}
                  className="accent-amber-400 w-4 h-4"
                />
              </label>

              <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${bgSubCard}`}>
                <span className="text-xs font-medium">חיבור לסליקת אשראי / תשלומים</span>
                <input
                  type="checkbox"
                  checked={hasPayments}
                  onChange={(e) => setHasPayments(e.target.checked)}
                  className="accent-amber-400 w-4 h-4"
                />
              </label>

              <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${bgSubCard}`}>
                <span className="text-xs font-medium">התראות ותזכורות ללקוחות (WhatsApp / SMS)</span>
                <input
                  type="checkbox"
                  checked={hasNotifications}
                  onChange={(e) => setHasNotifications(e.target.checked)}
                  className="accent-amber-400 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* תוצאת המחשבון */}
          <div className="rounded-xl bg-amber-400/10 border border-amber-400/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-amber-500 font-bold">הערכה משוערת:</div>
              <div className="text-xl font-black mt-0.5" dir="ltr">
                {estimate.priceRange}
              </div>
              <div className={`text-xs mt-0.5 ${textMuted}`}>
                זמן פיתוח משוער: <strong>{estimate.weeks}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendCalculatorToWhatsApp}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-4 py-3 rounded-xl transition shadow-md cursor-pointer shrink-0"
            >
              שלח הצעה זו לוואטסאפ 📲
            </button>
          </div>
        </section>

        {/* ================= פרויקטים נבחרים ================= */}
        <section id="projects" className="space-y-3 scroll-mt-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">פרויקטים נבחרים</h3>
            <span className="text-xs text-amber-500 font-medium">מערכות חיות</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={`border rounded-2xl p-4 ${bgCard}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">☕</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">
                  באוויר
                </span>
              </div>
              <h4 className="font-bold text-sm mb-1">עגלת הקפה</h4>
              <p className={`text-xs ${textMuted}`}>
                אפליקציית הזמנות, תפריט חכם, התאמה אישית של משקאות ואיסוף מהיר.
              </p>
            </div>

            <div className={`border rounded-2xl p-4 ${bgCard}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">✂️</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">
                  באוויר
                </span>
              </div>
              <h4 className="font-bold text-sm mb-1">המספרה — ניהול תורים</h4>
              <p className={`text-xs ${textMuted}`}>
                מערכת קביעת תורים ב-3 שלבים פשוטים, בחירת טיפול וניהול יומן לקוחות.
              </p>
            </div>
          </div>
        </section>

        {/* ================= טופס השאר פרטים ונחזור אליך ================= */}
        <section id="contact" className={`border rounded-2xl p-6 space-y-4 scroll-mt-20 ${bgCard}`}>
          <div className="text-center space-y-1">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 text-amber-500 text-xs font-bold">
              מוכנים להתחיל?
            </span>
            <h3 className="text-xl font-black">השאר פרטים ונחזור אליך</h3>
            <p className={`text-xs ${textMuted}`}>
              מלא פרטים קצרים וההודעה תישלח אליי ישירות לוואטסאפ
            </p>
          </div>

          <form onSubmit={handleLeadSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                required
                placeholder="השם שלך *"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-amber-400 transition ${bgSubCard}`}
              />
            </div>

            <div>
              <input
                type="tel"
                required
                placeholder="מספר טלפון לחזרה *"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-amber-400 transition ${bgSubCard}`}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="סוג העסק / הרעיון לאפליקציה (אופציונלי)"
                value={leadBusiness}
                onChange={(e) => setLeadBusiness(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-amber-400 transition ${bgSubCard}`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              שלח פרטים לוואטסאפ 🚀
            </button>
          </form>

          <div className={`pt-3 border-t text-center text-xs space-y-1 ${isDark ? "border-white/10" : "border-slate-200"} ${textMuted}`}>
            <p>
              טלפון ישיר:{" "}
              <a href="tel:0527431770" className="text-amber-500 font-bold hover:underline" dir="ltr">
                052-7431770
              </a>
            </p>
            <p>
              מייל:{" "}
              <a href="mailto:gilad.creating.apps@gmail.com" className="text-amber-500 font-bold hover:underline">
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
            MADE BY <span className="text-amber-500 font-bold">gilad_c</span>
          </div>
          <p className={`text-xs ${textMuted}`}>
            © 2026 גילעד קרליבך — כל הזכויות שמורות
          </p>
        </footer>
      </main>

      {/* ================= כפתור וואטסאפ צף בפינה התחתונה ================= */}
      <a
        href="https://wa.me/972527431770"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שלח הודעה בוואטסאפ"
        className="fixed bottom-20 left-4 z-40 w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 transition transform hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current">
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
          <a href="#top" className="flex flex-col items-center gap-0.5 py-1 text-amber-500 font-bold text-[11px]">
            <span className="text-base">🏠</span>
            <span>ראשי</span>
          </a>
          <a href="#services" className={`flex flex-col items-center gap-0.5 py-1 text-[11px] hover:text-amber-500 transition ${textMuted}`}>
            <span className="text-base">⚡</span>
            <span>שירותים</span>
          </a>
          <a href="#projects" className={`flex flex-col items-center gap-0.5 py-1 text-[11px] hover:text-amber-500 transition ${textMuted}`}>
            <span className="text-base">📱</span>
            <span>פרויקטים</span>
          </a>
          <a href="#contact" className={`flex flex-col items-center gap-0.5 py-1 text-[11px] hover:text-amber-500 transition ${textMuted}`}>
            <span className="text-base">💬</span>
            <span>צור קשר</span>
          </a>
        </div>
      </nav>
    </div>
  );
}