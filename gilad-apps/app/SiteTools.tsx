"use client";

import { useState, useEffect } from "react";

export type AccentColor = "amber" | "cyan" | "purple" | "emerald";
export type Language = "he" | "en";

interface SiteToolsProps {
  accent: AccentColor;
  setAccent: (color: AccentColor) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
}

export default function SiteTools({
  accent,
  setAccent,
  lang,
  setLang,
  isDark,
}: SiteToolsProps) {
  // תפריט נגישות
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [fontScale, setFontScale] = useState<number>(100);
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  // התראת "הועתק ללוח ✓"
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // החלת הגדרות נגישות על הדף
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;

    if (highContrast) {
      document.documentElement.classList.add("a11y-high-contrast");
    } else {
      document.documentElement.classList.remove("a11y-high-contrast");
    }

    if (highlightLinks) {
      document.documentElement.classList.add("a11y-highlight-links");
    } else {
      document.documentElement.classList.remove("a11y-highlight-links");
    }
  }, [fontScale, highContrast, highlightLinks]);

  const resetAccessibility = () => {
    setFontScale(100);
    setHighContrast(false);
    setHighlightLinks(false);
    showToast(lang === "he" ? "הגדרות נגישות אופסו ✓" : "Accessibility reset ✓");
  };

  // הורדת איש קשר ישירות לנייד (vCard .vcf)
  const handleDownloadVCard = () => {
    const vcardContent = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:קרליבך;גילעד;;;",
      "FN:גילעד קרליבך - יוצר אפליקציות",
      "ORG:גילעד קרליבך - פיתוח אפליקציות",
      "TITLE:יוצר אפליקציות לעסקים מתחילים",
      "TEL;TYPE=CELL,VOICE:+972527431770",
      "EMAIL;TYPE=PREF,INTERNET:gilad.creating.apps@gmail.com",
      "URL:https://giladcar.github.io/gilad.app/",
      "END:VCARD",
    ].join("\n");

    const blob = new Blob(["\uFEFF" + vcardContent], {
      type: "text/vcard;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Gilad_Karlibach_App_Creator.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      lang === "he"
        ? "קובץ איש הקשר ירד לנייד ✓"
        : "Contact card downloaded ✓"
    );
  };

  // שיתוף מהיר של האתר
  const handleShareSite = async () => {
    const shareData = {
      title:
        lang === "he"
          ? "גילעד קרליבך | פיתוח אפליקציות לעסקים מתחילים"
          : "Gilad Karlibach | App Development for Startups",
      text:
        lang === "he"
          ? "ממליץ לבדוק את גילעד קרליבך - פיתוח אפליקציות ואתרים ברמה גבוהה לעסקים:"
          : "Check out Gilad Karlibach - App & Web Development for businesses:",
      url: "https://giladcar.github.io/gilad.app/",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // המשתמש ביטל שיתוף
      }
    } else {
      await navigator.clipboard.writeText(shareData.url);
      showToast(
        lang === "he"
          ? "קישור האתר הועתק ללוח ✓"
          : "Site link copied to clipboard ✓"
      );
    }
  };

  // העתקה ללוח
  const handleCopy = async (text: string, labelHe: string, labelEn: string) => {
    await navigator.clipboard.writeText(text);
    showToast(lang === "he" ? `${labelHe} הועתק ללוח ✓` : `${labelEn} copied ✓`);
  };

  const accentOptions: { id: AccentColor; nameHe: string; bg: string }[] = [
    { id: "amber", nameHe: "כתום-זהב", bg: "bg-amber-400" },
    { id: "cyan", nameHe: "טורקיז-סייבר", bg: "bg-cyan-400" },
    { id: "purple", nameHe: "סגול", bg: "bg-purple-500" },
    { id: "emerald", nameHe: "ירוק אמרלד", bg: "bg-emerald-400" },
  ];

  const cardStyle = isDark
    ? "bg-[#16181f] border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-sm";

  const subBtnStyle = isDark
    ? "bg-[#222530] hover:bg-white/10 border-white/10 text-slate-200"
    : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800";

  return (
    <>
      {/* סגנונות גלובליים למצבי נגישות */}
      <style>{`
        .a11y-high-contrast {
          filter: contrast(1.25);
        }
        .a11y-highlight-links a,
        .a11y-highlight-links button {
          outline: 2px solid #facc15 !important;
          outline-offset: 2px !important;
        }
      `}</style>

      {/* התראה צפה: הועתק ללוח ✓ */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border border-white/20 px-5 py-2.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <span className="text-emerald-400">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* סרגל כלים חכמים בתוך הדף: בחירת צבע + שפה + איש קשר + שיתוף + העתקה */}
      <section className={`border rounded-2xl p-4 space-y-4 ${cardStyle}`}>
        {/* שורה עליונה: בחירת צבע ראשי + החלפת שפה */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-current/10">
          {/* בחירת צבע תצוגה */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold opacity-80">
              {lang === "he" ? "🎨 צבע תצוגה:" : "🎨 Accent:"}
            </span>
            <div className="flex items-center gap-1.5">
              {accentOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAccent(item.id)}
                  title={item.nameHe}
                  aria-label={item.nameHe}
                  className={`w-6 h-6 rounded-full ${item.bg} transition transform cursor-pointer ${
                    accent === item.id
                      ? "scale-115 ring-2 ring-offset-2 ring-offset-[#16181f] ring-white"
                      : "opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* כפתור מעבר שפה עברית / English */}
          <button
            type="button"
            onClick={() => setLang(lang === "he" ? "en" : "he")}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${subBtnStyle}`}
          >
            <span>🌐</span>
            <span>{lang === "he" ? "English" : "עברית"}</span>
          </button>
        </div>

        {/* שורה תחתונה: הורדת איש קשר, שיתוף מהיר והעתקת פרטים */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* הורדת איש קשר vCard */}
          <button
            type="button"
            onClick={handleDownloadVCard}
            className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer ${subBtnStyle}`}
          >
            <span className="text-base">📇</span>
            <span>{lang === "he" ? "שמור איש קשר" : "Save Contact"}</span>
          </button>

          {/* שיתוף מהיר של האתר */}
          <button
            type="button"
            onClick={handleShareSite}
            className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer ${subBtnStyle}`}
          >
            <span className="text-base">📤</span>
            <span>{lang === "he" ? "שתף אתר" : "Share Site"}</span>
          </button>

          {/* העתקת טלפון */}
          <button
            type="button"
            onClick={() => handleCopy("0527431770", "מספר הטלפון", "Phone number")}
            className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer ${subBtnStyle}`}
          >
            <span className="text-base">📋</span>
            <span>{lang === "he" ? "העתק טלפון" : "Copy Phone"}</span>
          </button>

          {/* העתקת מייל */}
          <button
            type="button"
            onClick={() =>
              handleCopy("gilad.creating.apps@gmail.com", "האימייל", "Email")
            }
            className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer ${subBtnStyle}`}
          >
            <span className="text-base">✉️</span>
            <span>{lang === "he" ? "העתק מייל" : "Copy Email"}</span>
          </button>
        </div>
      </section>

      {/* כפתור נגישות צף בפינה הימנית התחתונה */}
      <button
        type="button"
        onClick={() => setIsA11yOpen(!isA11yOpen)}
        aria-label={lang === "he" ? "תפריט נגישות" : "Accessibility Menu"}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-600/30 transition transform hover:scale-105 cursor-pointer text-xl"
        title={lang === "he" ? "נגישות" : "Accessibility"}
      >
        ♿
      </button>

      {/* חלונית תפריט נגישות */}
      {isA11yOpen && (
        <div
          className={`fixed bottom-36 right-4 z-50 w-72 rounded-2xl border p-4 shadow-2xl space-y-3 ${cardStyle}`}
        >
          <div className="flex items-center justify-between border-b border-current/10 pb-2">
            <span className="font-black text-sm flex items-center gap-1.5">
              <span>♿</span>
              <span>{lang === "he" ? "כלי נגישות" : "Accessibility"}</span>
            </span>
            <button
              type="button"
              onClick={() => setIsA11yOpen(false)}
              className="text-xs font-bold opacity-70 hover:opacity-100 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* גודל טקסט */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold block">
              {lang === "he" ? `גודל טקסט (${fontScale}%)` : `Text Size (${fontScale}%)`}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFontScale((prev) => Math.min(prev + 10, 130))}
                className={`py-2 rounded-xl border text-xs font-bold cursor-pointer ${subBtnStyle}`}
              >
                {lang === "he" ? "הגדל טקסט A+" : "Increase A+"}
              </button>
              <button
                type="button"
                onClick={() => setFontScale((prev) => Math.max(prev - 10, 90))}
                className={`py-2 rounded-xl border text-xs font-bold cursor-pointer ${subBtnStyle}`}
              >
                {lang === "he" ? "הקטן טקסט A-" : "Decrease A-"}
              </button>
            </div>
          </div>

          {/* ניגודיות גבוהה */}
          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer ${
              highContrast ? "bg-blue-600 text-white border-blue-500" : subBtnStyle
            }`}
          >
            <span>{lang === "he" ? "ניגודיות גבוהה" : "High Contrast"}</span>
            <span>{highContrast ? "✓" : ""}</span>
          </button>

          {/* הדגשת קישורים וכפתורים */}
          <button
            type="button"
            onClick={() => setHighlightLinks(!highlightLinks)}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer ${
              highlightLinks ? "bg-blue-600 text-white border-blue-500" : subBtnStyle
            }`}
          >
            <span>{lang === "he" ? "הדגשת קישורים וכפתורים" : "Highlight Links"}</span>
            <span>{highlightLinks ? "✓" : ""}</span>
          </button>

          {/* איפוס נגישות */}
          <button
            type="button"
            onClick={resetAccessibility}
            className="w-full py-2 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 text-xs font-bold transition cursor-pointer"
          >
            {lang === "he" ? "איפוס הגדרות נגישות" : "Reset Settings"}
          </button>
        </div>
      )}
    </>
  );
}