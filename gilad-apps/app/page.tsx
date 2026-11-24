"use client";

import { useState, useEffect, useCallback } from "react";
import SiteTools, { AccentColor, Language } from "./SiteTools";

interface ResolvedSlide {
  type: "video" | "image";
  src: string;
  label: string;
}

interface FeaturedProject {
  id: string;
  filePrefix: string;
  titleHe: string;
  titleEn: string;
  categoryHe: string;
  categoryEn: string;
  descHe: string;
  descEn: string;
  tags: string[];
}

// ================= הגדרת הפרויקטים הנבחרים שלך =================
// המערכת מזהה אוטומטית כל קובץ שתשים בתיקיית public/ בפורמט:
// project-1-P1.png / .mp4  עד  project-1-P12.png / .mp4 (וגם project-3-video.mp4)
const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "proj-1",
    filePrefix: "project-1",
    titleHe: "מערכת קביעת תורים וניהול יומן",
    titleEn: "Appointment Booking & Calendar System",
    categoryHe: "מערכת ניהול ותורים",
    categoryEn: "Booking System",
    descHe: "ממשק לקוח לבחירת שירות ושעה פנויה, לצד פאנל ניהול לבעל העסק.",
    descEn: "Client booking interface alongside a dedicated business management panel.",
    tags: ["Mobile First", "RTL", "Admin Panel"],
  },
  {
    id: "proj-2",
    filePrefix: "project-2",
    titleHe: "אפליקציית הזמנות ותפריט דיגיטלי",
    titleEn: "Digital Menu & Ordering App",
    categoryHe: "הזמנות אונליין",
    categoryEn: "Online Ordering",
    descHe: "תפריט אינטראקטיבי מותאם לנייד עם התאמות אישיות לכל פריט והעברת הזמנות.",
    descEn: "Interactive mobile menu with custom item options and streamlined order flow.",
    tags: ["Web App", "UI/UX", "Custom Flow"],
  },
  {
    id: "proj-3",
    filePrefix: "project-3",
    titleHe: "פאנל ניהול ובקרה לעסק",
    titleEn: "Business Control & Admin Dashboard",
    categoryHe: "ממשק ניהול",
    categoryEn: "Dashboard",
    descHe: "מסך ניהול מרכזי לצפייה בנתונים, עריכת זמינות וניהול לקוחות במקום אחד.",
    descEn: "Centralized control screen for viewing data, editing availability, and managing clients.",
    tags: ["Dashboard", "Management", "Custom System"],
  },
];

export default function Home() {
  // Splash Screen
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  // Light / Dark Mode
  const [isDark, setIsDark] = useState(true);

  // Accent Color & Language (from SiteTools)
  const [accent, setAccent] = useState<AccentColor>("amber");
  const [lang, setLang] = useState<Language>("he");

  // Animated Card Flip
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardImgIndex, setCardImgIndex] = useState(0);
  const cardImgSources = [
    "/gilad.app/business-card.gif",
    "/gilad.app/business-card.jpg",
    "/gilad.app/business-card.png",
  ];

  // Auto-Discovered Project Media (Images & Videos P1..P12)
  const [discoveredMedia, setDiscoveredMedia] = useState<Record<string, ResolvedSlide[]>>({});
  const [isScanningMedia, setIsScanningMedia] = useState<boolean>(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState<Record<string, number>>({});
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [modalSlideIndex, setModalSlideIndex] = useState<number>(0);

  // Local Demo Sandbox
  const [sandboxTab, setSandboxTab] = useState<"barber" | "coffee">("barber");
  const [barberService, setBarberService] = useState("תספורת גברים");
  const [barberTime, setBarberTime] = useState("16:30");
  const [barberBooked, setBarberBooked] = useState(false);

  const [coffeeDrink, setCoffeeDrink] = useState("הפוך גדול");
  const [coffeeMilk, setCoffeeMilk] = useState("חלב שיבולת");
  const [coffeeOrdered, setCoffeeOrdered] = useState(false);

  // 3-Question Business Quiz
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<{
    goal: string;
    clients: string;
    management: string;
  }>({
    goal: "",
    clients: "",
    management: "",
  });

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

  // Automatic detection of all existing P1..P12 images & videos in public/
  useEffect(() => {
    let isCancelled = false;

    const checkFileExists = async (url: string): Promise<boolean> => {
      try {
        const res = await fetch(url, { method: "HEAD", cache: "no-store" });
        return res.ok;
      } catch {
        return false;
      }
    };

    const scanAllProjects = async () => {
      const results: Record<string, ResolvedSlide[]> = {};

      await Promise.all(
        FEATURED_PROJECTS.map(async (proj) => {
          const foundSlides: ResolvedSlide[] = [];

          // Scan P1 through P12 in parallel
          const pageNumbers = Array.from({ length: 12 }, (_, idx) => idx + 1);
          const pageChecks = await Promise.all(
            pageNumbers.map(async (pageNum) => {
              const base = `/gilad.app/${proj.filePrefix}-P${pageNum}`;
              const candidates: { url: string; type: "video" | "image" }[] = [
                { url: `${base}.mp4`, type: "video" },
                { url: `${base}.MP4`, type: "video" },
                { url: `${base}.webm`, type: "video" },
                { url: `${base}.mov`, type: "video" },
                { url: `${base}.png`, type: "image" },
                { url: `${base}.PNG`, type: "image" },
                { url: `${base}.jpg`, type: "image" },
                { url: `${base}.JPG`, type: "image" },
                { url: `${base}.jpeg`, type: "image" },
                { url: `${base}.webp`, type: "image" },
              ];

              for (const item of candidates) {
                if (await checkFileExists(item.url)) {
                  return {
                    type: item.type,
                    src: item.url,
                    label: `P${pageNum}`,
                  };
                }
              }
              return null;
            })
          );

          pageChecks.forEach((slide) => {
            if (slide) foundSlides.push(slide);
          });

          // Also check dedicated video file (e.g., project-3-video.mp4)
          const videoBase = `/gilad.app/${proj.filePrefix}-video`;
          const dedicatedVideos = [
            `${videoBase}.mp4`,
            `${videoBase}.MP4`,
            `${videoBase}.webm`,
            `${videoBase}.mov`,
          ];
          for (const vUrl of dedicatedVideos) {
            if (await checkFileExists(vUrl)) {
              foundSlides.push({
                type: "video",
                src: vUrl,
                label: "VIDEO",
              });
              break;
            }
          }

          results[proj.id] = foundSlides;
        })
      );

      if (!isCancelled) {
        setDiscoveredMedia(results);
        setIsScanningMedia(false);
      }
    };

    scanAllProjects();
    return () => {
      isCancelled = true;
    };
  }, []);

  const getValidSlides = useCallback(
    (proj: FeaturedProject): ResolvedSlide[] => {
      return discoveredMedia[proj.id] || [];
    },
    [discoveredMedia]
  );

  // Auto-advance project carousel every 6 seconds when modal is NOT open
  useEffect(() => {
    if (selectedProject) return;

    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => {
        const nextState = { ...prev };
        FEATURED_PROJECTS.forEach((proj) => {
          const slides = getValidSlides(proj);
          if (slides.length > 1) {
            const current = prev[proj.id] || 0;
            nextState[proj.id] = (current + 1) % slides.length;
          }
        });
        return nextState;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [selectedProject, getValidSlides]);

  // Keyboard navigation inside the enlarged Lightbox Modal
  useEffect(() => {
    if (!selectedProject) return;
    const slides = getValidSlides(selectedProject);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      } else if (e.key === "ArrowRight" && slides.length > 1) {
        setModalSlideIndex((prev) => (prev + 1) % slides.length);
      } else if (e.key === "ArrowLeft" && slides.length > 1) {
        setModalSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, getValidSlides]);

  const handleOpenProjectModal = (proj: FeaturedProject) => {
    const slides = getValidSlides(proj);
    if (slides.length === 0) return;
    const currentIdx = (activeSlideIndex[proj.id] || 0) % slides.length;
    setModalSlideIndex(currentIdx);
    setSelectedProject(proj);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;
    const msg =
      lang === "he"
        ? `היי גילעד, השארתי פרטים באתר:\n• שם: ${leadName}\n• טלפון: ${leadPhone}\n• תחום העסק: ${leadBusiness || "לא צוין"}`
        : `Hi Gilad, I left my details on your site:\n• Name: ${leadName}\n• Phone: ${leadPhone}\n• Business: ${leadBusiness || "Not specified"}`;
    window.open(`https://wa.me/972527431770?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const getQuizRecommendation = () => {
    if (quizAnswers.goal === "תורים ויומן לקוחות") {
      return {
        title: "מערכת קביעת תורים ויומן לקוחות",
        desc: "מערכת שמאפשרת ללקוחות לקבוע תור בצורה מסודרת דרך הנייד, עם ניהול שעות וטיפולים.",
      };
    }
    if (quizAnswers.goal === "מכירות והזמנות אונליין") {
      return {
        title: "אפליקציית הזמנות ותפריט דיגיטלי",
        desc: "תפריט או קטלוג מותאם מובייל עם בחירת אפשרויות והעברת הזמנות בצורה מסודרת.",
      };
    }
    return {
      title: "אפליקציית MVP מותאמת אישית",
      desc: "גרסה ראשונית ממוקדת לרעיון שלך, מותאמת למובייל ולשימוש נוח.",
    };
  };

  const handleSendQuizToWhatsApp = () => {
    const rec = getQuizRecommendation();
    const msg = `היי גילעד! מילאתי את השאלון באתר:\n• מטרה עיקרית: ${quizAnswers.goal}\n• אופי הלקוחות: ${quizAnswers.clients}\n• ניהול נדרש: ${quizAnswers.management}\n• הכיוון שהוצג: ${rec.title}\nאשמח לדבר על זה!`;
    window.open(`https://wa.me/972527431770?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const accentStyles: Record<
    AccentColor,
    {
      btn: string;
      text: string;
      badge: string;
      border: string;
      glow: string;
      heroBg: string;
      spinBorder: string;
    }
  > = {
    amber: {
      btn: "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20",
      text: "text-amber-400",
      badge: "bg-amber-400/15 text-amber-400 border-amber-400/30",
      border: "border-amber-400/40",
      glow: "shadow-[0_0_40px_rgba(251,191,36,0.14)]",
      heroBg: isDark
        ? "bg-gradient-to-br from-amber-500/15 via-[#16181f] to-[#0b0c10] border-amber-500/30"
        : "bg-gradient-to-br from-amber-100 via-white to-amber-50 border-amber-300",
      spinBorder: "border-amber-500/20 border-t-amber-400 border-r-amber-400",
    },
    cyan: {
      btn: "bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-cyan-500/20",
      text: "text-cyan-400",
      badge: "bg-cyan-400/15 text-cyan-400 border-cyan-400/30",
      border: "border-cyan-400/40",
      glow: "shadow-[0_0_40px_rgba(34,211,238,0.14)]",
      heroBg: isDark
        ? "bg-gradient-to-br from-cyan-500/15 via-[#16181f] to-[#0b0c10] border-cyan-500/30"
        : "bg-gradient-to-br from-cyan-100 via-white to-cyan-50 border-cyan-300",
      spinBorder: "border-cyan-500/20 border-t-cyan-400 border-r-cyan-400",
    },
    purple: {
      btn: "bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/20",
      text: "text-purple-400",
      badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
      border: "border-purple-400/40",
      glow: "shadow-[0_0_40px_rgba(168,85,247,0.18)]",
      heroBg: isDark
        ? "bg-gradient-to-br from-purple-500/15 via-[#16181f] to-[#0b0c10] border-purple-500/30"
        : "bg-gradient-to-br from-purple-100 via-white to-purple-50 border-purple-300",
      spinBorder: "border-purple-500/20 border-t-purple-400 border-r-purple-400",
    },
    emerald: {
      btn: "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-500/20",
      text: "text-emerald-400",
      badge: "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
      border: "border-emerald-400/40",
      glow: "shadow-[0_0_40px_rgba(52,211,153,0.14)]",
      heroBg: isDark
        ? "bg-gradient-to-br from-emerald-500/15 via-[#16181f] to-[#0b0c10] border-emerald-500/30"
        : "bg-gradient-to-br from-emerald-100 via-white to-emerald-50 border-emerald-300",
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
              {lang === "he" ? "טוען..." : "Loading..."}
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
        className={`border-b py-2 px-4 text-center text-xs font-bold ${
          isDark ? `bg-[#16181f] border-white/10 ${theme.text}` : `${theme.btn} border-black/10`
        }`}
      >
        {lang === "he"
          ? "⚡ פיתוח אפליקציות ומערכות חכמות לעסקים"
          : "⚡ Smart App & Web Development for Businesses"}
      </div>

      {/* ================= HEADER ================= */}
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
                {lang === "he" ? "יוצר אפליקציות לעסקים" : "Business App Creator"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${bgCard}`}
            >
              <span>{isDark ? "☀️" : "🌙"}</span>
              <span>{isDark ? (lang === "he" ? "בהיר" : "Light") : lang === "he" ? "כהה" : "Dark"}</span>
            </button>

            <a
              href="https://wa.me/972527431770"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-md shrink-0 ${theme.btn}`}
            >
              {lang === "he" ? "דבר איתי" : "Contact"}
            </a>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main id="top" className="max-w-2xl mx-auto px-4 py-6 space-y-7">
        {/* ================= 1. HERO SECTION ================= */}
        <section className={`rounded-3xl border p-6 space-y-4 relative overflow-hidden ${theme.heroBg} ${theme.glow}`}>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight">
            {lang === "he"
              ? "אפליקציה מותאמת אישית לעסק שלך — סדר, נוחות ועבודה חכמה מהנייד"
              : "A Custom App for Your Business — Order, Convenience & Smart Mobile Workflow"}
          </h1>

          <p className={`text-xs sm:text-sm leading-relaxed ${textMuted}`}>
            {lang === "he"
              ? "מערכות הזמנות, קביעת תורים ואפליקציות מותאמות לצרכים של העסק שלך, בעיצוב נקי ובשימוש נוח ללקוחות."
              : "Ordering systems, appointment scheduling, and custom apps tailored to your business needs."}
          </p>

          <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
            <a
              href="https://wa.me/972527431770?text=היי%20גילעד,%20אשמח%20לדבר%20על%20אפליקציה%20לעסק%20שלי"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 text-center font-black text-xs sm:text-sm px-5 py-3.5 rounded-2xl transition shadow-lg ${theme.btn}`}
            >
              {lang === "he" ? "שלח הודעה בוואטסאפ 🚀" : "Message on WhatsApp 🚀"}
            </a>

            <a
              href="#projects"
              className={`text-center font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl border transition ${bgCard}`}
            >
              {lang === "he" ? "צפה בפרויקטים 🖼️" : "View Projects 🖼️"}
            </a>
          </div>
        </section>

        {/* ================= 2. קצת עליי ומה אנחנו עושים ================= */}
        <section id="about" className={`border rounded-3xl p-6 space-y-4 scroll-mt-20 ${bgCard}`}>
          <div className="space-y-1">
            <span className={`text-xs font-bold block ${theme.text}`}>
              {lang === "he" ? "👋 נעים להכיר" : "👋 Nice to Meet You"}
            </span>
            <h3 className="text-lg sm:text-xl font-black">
              {lang === "he" ? "קצת עליי ומה אנחנו עושים" : "About Me & What We Do"}
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
            <p>
              {lang === "he" ? (
                <>
                  שמי <strong>גילעד</strong>, ואני עוסק בתחום בניית האפליקציות ופיתוח מערכות דיגיטליות לעסקים. המטרה שלי היא לקחת את הצרכים היומיומיים של העסק או הרעיון שלכם, ולהפוך אותם למערכת ברורה, נוחה ומסודרת שכל לקוח יכול להשתמש בה בקלות מהנייד או מהמחשב.
                </>
              ) : (
                <>
                  My name is <strong>Gilad</strong>, and I work in app development and building digital systems for businesses. My focus is turning your business workflow or idea into a clear, intuitive, and well-organized system for both you and your clients.
                </>
              )}
            </p>

            <p className={textMuted}>
              {lang === "he"
                ? "אנחנו בונים אתרים ואפליקציות בהתאמה אישית מלאה לפי הבקשה שלכם — החל ממערכות לקביעת תורים וניהול יומן, דרך תפריטים דיגיטליים ומערכות הזמנות, ועד לאתרי תדמית וממשקי ניהול שנבנים בדיוק סביב האופן שבו העסק שלכם עובד."
                : "We build websites and custom applications tailored specifically to your request — from appointment booking and calendar systems, to digital menus, ordering platforms, and business management interfaces built around your exact workflow."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
            <div className={`p-3.5 rounded-2xl border space-y-1 ${bgSubCard}`}>
              <div className={`font-black ${theme.text}`}>
                {lang === "he" ? "📱 אפליקציות לפי דרישה" : "📱 Custom Apps"}
              </div>
              <p className={textMuted}>
                {lang === "he"
                  ? "בניית אפליקציות מותאמות לצרכים של העסק ולחוויית המשתמש."
                  : "Apps tailored to your business needs and user experience."}
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border space-y-1 ${bgSubCard}`}>
              <div className={`font-black ${theme.text}`}>
                {lang === "he" ? "🌐 אתרים וממשקי ניהול" : "🌐 Websites & Admin Panels"}
              </div>
              <p className={textMuted}>
                {lang === "he"
                  ? "פיתוח אתרים ומסכי ניהול נוחים לעדכון שעות, מוצרים ופניות."
                  : "Websites and clean control panels for managing hours, items, and leads."}
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border space-y-1 ${bgSubCard}`}>
              <div className={`font-black ${theme.text}`}>
                {lang === "he" ? "🎯 התאמה לבקשת הלקוח" : "🎯 Built to Your Request"}
              </div>
              <p className={textMuted}>
                {lang === "he"
                  ? "כל מסך, כפתור ותהליך מתוכננים בהתאם למה שביקשתם."
                  : "Every screen, button, and flow is planned according to your request."}
              </p>
            </div>
          </div>
        </section>

        {/* ================= 3. כרטיס הביקור הדיגיטלי ================= */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{lang === "he" ? "כרטיס הביקור הדיגיטלי" : "Digital Business Card"}</span>
            </h3>
            <button
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className={`text-xs font-bold hover:underline cursor-pointer ${theme.text}`}
            >
              {lang === "he" ? "🔄 הפוך כרטיס" : "🔄 Flip Card"}
            </button>
          </div>

          <div onClick={() => setIsCardFlipped(!isCardFlipped)} className="cursor-pointer select-none">
            {!isCardFlipped ? (
              <div
                className={`relative rounded-2xl overflow-hidden border shadow-xl aspect-[3/2] bg-gradient-to-br from-[#0a1128] via-[#121d42] to-[#080d21] text-white ${theme.border}`}
              >
                {cardImgIndex < cardImgSources.length ? (
                  <img
                    src={cardImgSources[cardImgIndex]}
                    alt="כרטיס ביקור גילעד קרליבך"
                    onError={() => setCardImgIndex((prev) => prev + 1)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full relative overflow-hidden p-6 flex flex-col justify-between">
                    <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-xl bg-white/10 border border-cyan-400/30 text-xs font-mono text-cyan-300"
                        dir="ltr"
                      >
                        &lt;/&gt; APP DEV
                      </span>
                      <span className="text-xs text-slate-400">
                        {lang === "he" ? "לחץ להיפוך ↻" : "Tap to flip ↻"}
                      </span>
                    </div>

                    <div className={`relative z-10 ${lang === "he" ? "text-right" : "text-left"}`}>
                      <h4 className="text-2xl sm:text-3xl font-black text-white">
                        {lang === "he" ? "גילעד קרליבך" : "Gilad Karlibach"}
                      </h4>
                      <p className="text-cyan-400 font-bold text-sm sm:text-base mt-1">
                        {lang === "he"
                          ? "פיתוח אפליקציות לעסקים"
                          : "App Development for Businesses"}
                      </p>
                    </div>

                    <div
                      className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-slate-300 font-mono"
                      dir="ltr"
                    >
                      <span>✉️ gilad.creating.apps@gmail.com</span>
                      <span>📞 0527431770</span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-lg border border-white/15">
                  {lang === "he" ? "לחץ לצד האחורי ↻" : "Tap to flip ↻"}
                </div>
              </div>
            ) : (
              <div
                className={`rounded-2xl border shadow-xl aspect-[3/2] bg-gradient-to-br from-[#16181f] to-[#0b0c10] text-white p-6 flex flex-col justify-between ${theme.border}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${theme.text}`}>
                    {lang === "he" ? "תחומי פיתוח:" : "Development Areas:"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === "he" ? "לחץ לחזרה ↺" : "Tap to return ↺"}
                  </span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  <li>• אפליקציות לקביעת תורים וניהול יומן</li>
                  <li>• מערכות הזמנות ותפריטים דיגיטליים</li>
                  <li>• אתרי תדמית וממשקים מותאמים לנייד</li>
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

        {/* ================= 4. פרויקטים נבחרים (זיהוי אוטומטי של P1..P12 + סרטונים) ================= */}
        <section id="projects" className={`border rounded-3xl p-5 space-y-4 scroll-mt-20 ${bgCard}`}>
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className={`text-xs font-bold block ${theme.text}`}>
                {lang === "he" ? "🎬 הצצה לעבודות (וידאו ותמונות)" : "🎬 Work Showcase (Video & Images)"}
              </span>
              <h3 className="text-lg font-black">
                {lang === "he" ? "פרויקטים נבחרים" : "Featured Projects"}
              </h3>
            </div>
            <span className={`text-[11px] px-2.5 py-1 rounded-full border ${bgSubCard} ${textMuted}`}>
              {lang === "he" ? "לחץ להגדלה ודפדוף" : "Click to enlarge"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {FEATURED_PROJECTS.map((proj) => {
              const validSlides = getValidSlides(proj);
              const currentIdx = validSlides.length > 0 ? (activeSlideIndex[proj.id] || 0) % validSlides.length : 0;
              const currentSlide = validSlides[currentIdx];

              return (
                <div
                  key={proj.id}
                  onClick={() => handleOpenProjectModal(proj)}
                  className={`rounded-2xl border overflow-hidden flex flex-col transition ${bgSubCard} ${
                    validSlides.length > 0 ? "cursor-pointer hover:scale-[1.01]" : ""
                  }`}
                >
                  {/* אזור תצוגת הסרטון / התמונה (מתחלף אוטומטית כל 6 שניות) */}
                  <div className="relative aspect-[16/10] bg-[#0b0c10] overflow-hidden flex items-center justify-center border-b border-white/10">
                    {validSlides.length > 0 && currentSlide ? (
                      <>
                        {currentSlide.type === "video" ? (
                          <video
                            key={currentSlide.src}
                            src={currentSlide.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={currentSlide.src}
                            alt={`${lang === "he" ? proj.titleHe : proj.titleEn} - ${currentSlide.label}`}
                            className="w-full h-full object-cover transition-opacity duration-500"
                          />
                        )}

                        {/* תגית מספר עמוד + חיווי וידאו */}
                        <div
                          className="absolute top-2 right-2 flex items-center gap-1.5"
                          dir="ltr"
                        >
                          {validSlides.length > 1 && (
                            <span className="bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/15">
                              {currentIdx + 1} / {validSlides.length} ({currentSlide.label})
                            </span>
                          )}
                          {currentSlide.type === "video" && (
                            <span className="bg-emerald-500/90 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md">
                              🎬 VIDEO
                            </span>
                          )}
                        </div>

                        {/* נקודות חיווי בתחתית */}
                        {validSlides.length > 1 && (
                          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full">
                            {validSlides.map((_, dotIdx) => (
                              <span
                                key={dotIdx}
                                className={`h-1.5 rounded-full transition-all ${
                                  dotIdx === currentIdx ? "w-3.5 bg-amber-400" : "w-1.5 bg-white/40"
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md border border-white/15">
                          {lang === "he" ? "להגדלה 🔍" : "Enlarge 🔍"}
                        </div>
                      </>
                    ) : isScanningMedia ? (
                      <div className="p-4 text-center space-y-1.5">
                        <div className="text-xl animate-pulse">⏳</div>
                        <p className="text-xs text-slate-400">
                          {lang === "he" ? "טוען קבצים..." : "Loading media..."}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 text-center space-y-1.5">
                        <div className="text-2xl">🎬 / 📸</div>
                        <p className="text-xs font-bold text-slate-300">
                          {lang === "he" ? "מקום לסרטון או תמונה" : "Video or Image Slot"}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400 leading-relaxed" dir="ltr">
                          public/{proj.filePrefix}-P1.png
                          <br />
                          public/{proj.filePrefix}-P1.mp4
                        </p>
                      </div>
                    )}
                  </div>

                  {/* פרטי הפרויקט */}
                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className={`text-[11px] font-bold ${theme.text}`}>
                        {lang === "he" ? proj.categoryHe : proj.categoryEn}
                      </span>
                      <h4 className="font-black text-sm leading-snug">
                        {lang === "he" ? proj.titleHe : proj.titleEn}
                      </h4>
                      <p className={`text-xs leading-relaxed ${textMuted}`}>
                        {lang === "he" ? proj.descHe : proj.descEn}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1" dir="ltr">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/25 border border-white/10 opacity-80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= חלון הגדלת סרטון/תמונה עם דפדוף ימינה ושמאלה (Lightbox Modal) ================= */}
        {selectedProject && (() => {
          const validSlides = getValidSlides(selectedProject);
          const safeModalIdx = validSlides.length > 0 ? modalSlideIndex % validSlides.length : 0;
          const activeModalSlide = validSlides[safeModalIdx];

          const goNext = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (validSlides.length <= 1) return;
            setModalSlideIndex((prev) => (prev + 1) % validSlides.length);
          };

          const goPrev = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (validSlides.length <= 1) return;
            setModalSlideIndex((prev) => (prev - 1 + validSlides.length) % validSlides.length);
          };

          return (
            <div
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`max-w-2xl w-full rounded-3xl border overflow-hidden shadow-2xl ${bgCard}`}
              >
                <div className="relative bg-black flex items-center justify-center min-h-[260px] max-h-[72vh] overflow-hidden select-none">
                  {activeModalSlide && activeModalSlide.type === "video" ? (
                    <video
                      key={activeModalSlide.src}
                      src={activeModalSlide.src}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-auto max-h-[72vh] object-contain"
                    />
                  ) : (
                    activeModalSlide && (
                      <img
                        src={activeModalSlide.src}
                        alt={`${lang === "he" ? selectedProject.titleHe : selectedProject.titleEn} - ${activeModalSlide.label}`}
                        className="w-full h-auto max-h-[72vh] object-contain"
                      />
                    )
                  )}

                  {/* כפתור סגירה */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    aria-label="סגור"
                    className="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/80 text-white border border-white/25 flex items-center justify-center font-bold cursor-pointer hover:bg-black z-10"
                  >
                    ✕
                  </button>

                  {/* מונה עמודים */}
                  {validSlides.length > 1 && (
                    <div
                      className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-mono border border-white/20 z-10"
                      dir="ltr"
                    >
                      {activeModalSlide?.label} ({safeModalIdx + 1} / {validSlides.length})
                    </div>
                  )}

                  {/* כפתורי דפדוף ימינה ושמאלה */}
                  {validSlides.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="הבא"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-black text-white border border-white/25 flex items-center justify-center text-lg font-black cursor-pointer shadow-lg transition transform hover:scale-105 z-10"
                      >
                        ❯
                      </button>
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="הקודם"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-black text-white border border-white/25 flex items-center justify-center text-lg font-black cursor-pointer shadow-lg transition transform hover:scale-105 z-10"
                      >
                        ❮
                      </button>
                    </>
                  )}
                </div>

                {/* פס תחתון עם תיאור וכפתורי בחירה ישירה לעמוד */}
                <div className="p-4 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-xs font-bold ${theme.text}`}>
                      {lang === "he" ? selectedProject.categoryHe : selectedProject.categoryEn}
                    </span>

                    {validSlides.length > 1 && (
                      <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
                        {validSlides.map((slideItem, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setModalSlideIndex(idx)}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold transition cursor-pointer ${
                              idx === safeModalIdx
                                ? theme.btn
                                : "bg-white/10 text-slate-300 hover:bg-white/20"
                            }`}
                          >
                            {slideItem.type === "video" ? "🎬 " : ""}
                            {slideItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-black">
                      {lang === "he" ? selectedProject.titleHe : selectedProject.titleEn}
                    </h4>
                    <p className={`text-xs ${textMuted}`}>
                      {lang === "he" ? selectedProject.descHe : selectedProject.descEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ================= 5. הדגמה אינטראקטיבית בטלפון ================= */}
        <section id="sandbox" className={`border rounded-3xl p-5 space-y-4 scroll-mt-20 ${bgCard}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-black">
              {lang === "he"
                ? "התנסות חיה בממשק לדוגמה"
                : "Interactive Interface Preview"}
            </h3>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSandboxTab("barber");
                  setBarberBooked(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                  sandboxTab === "barber" ? theme.btn : bgSubCard
                }`}
              >
                ✂️ דוגמת תורים
              </button>
              <button
                type="button"
                onClick={() => {
                  setSandboxTab("coffee");
                  setCoffeeOrdered(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                  sandboxTab === "coffee" ? theme.btn : bgSubCard
                }`}
              >
                ☕ דוגמת הזמנות
              </button>
            </div>
          </div>

          <div className="max-w-sm mx-auto rounded-[2rem] border-[5px] border-slate-800 bg-[#0b0c10] text-white shadow-xl overflow-hidden">
            <div className="bg-slate-900 py-2 px-5 flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10">
              <span>9:41</span>
              <span className="px-2.5 py-0.5 rounded-full bg-black text-[9px] text-slate-300 font-mono">
                PREVIEW
              </span>
              <span>5G 🔋</span>
            </div>

            <div className="p-5 space-y-4">
              {sandboxTab === "barber" ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-amber-400 font-bold">דוגמה</span>
                      <h4 className="font-black text-base">מערכת קביעת תורים</h4>
                    </div>
                    <span className="text-2xl">✂️</span>
                  </div>

                  {!barberBooked ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">1. בחר שירות:</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {["תספורת גברים", "תספורת + זקן"].map((srv) => (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => setBarberService(srv)}
                              className={`py-2 px-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                barberService === srv
                                  ? "bg-amber-400 text-slate-950 border-amber-400"
                                  : "bg-[#16181f] border-white/10 text-slate-300"
                              }`}
                            >
                              {srv}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">2. בחר שעה:</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {["16:30", "17:15", "18:00"].map((tm) => (
                            <button
                              key={tm}
                              type="button"
                              onClick={() => setBarberTime(tm)}
                              className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                barberTime === tm
                                  ? "bg-amber-400 text-slate-950 border-amber-400"
                                  : "bg-[#16181f] border-white/10 text-slate-300"
                              }`}
                            >
                              {tm}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setBarberBooked(true)}
                        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer"
                      >
                        אשר בחירה ✓
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-center space-y-2">
                      <div className="text-2xl">✓</div>
                      <h5 className="font-black text-sm text-emerald-400">הבחירה נקלטה בדוגמה</h5>
                      <p className="text-xs text-slate-300">
                        {barberService} • שעה {barberTime}
                      </p>
                      <button
                        type="button"
                        onClick={() => setBarberBooked(false)}
                        className="text-xs underline text-amber-400 font-bold cursor-pointer pt-1"
                      >
                        איפוס דוגמה ↻
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-cyan-400 font-bold">דוגמה</span>
                      <h4 className="font-black text-base">תפריט הזמנות מהיר</h4>
                    </div>
                    <span className="text-2xl">☕</span>
                  </div>

                  {!coffeeOrdered ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">1. בחר פריט:</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {["הפוך גדול", "אייס קפה"].map((drk) => (
                            <button
                              key={drk}
                              type="button"
                              onClick={() => setCoffeeDrink(drk)}
                              className={`py-2 px-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                coffeeDrink === drk
                                  ? "bg-cyan-400 text-slate-950 border-cyan-400"
                                  : "bg-[#16181f] border-white/10 text-slate-300"
                              }`}
                            >
                              {drk}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">2. העדפה:</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {["חלב רגיל", "חלב שיבולת"].map((mlk) => (
                            <button
                              key={mlk}
                              type="button"
                              onClick={() => setCoffeeMilk(mlk)}
                              className={`py-2 px-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                coffeeMilk === mlk
                                  ? "bg-cyan-400 text-slate-950 border-cyan-400"
                                  : "bg-[#16181f] border-white/10 text-slate-300"
                              }`}
                            >
                              {mlk}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setCoffeeOrdered(true)}
                        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer"
                      >
                        שלח בדוגמה ✓
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-center space-y-2">
                      <div className="text-2xl">☕</div>
                      <h5 className="font-black text-sm text-emerald-400">הבחירה נקלטה בדוגמה</h5>
                      <p className="text-xs text-slate-300">
                        {coffeeDrink} ({coffeeMilk})
                      </p>
                      <button
                        type="button"
                        onClick={() => setCoffeeOrdered(false)}
                        className="text-xs underline text-cyan-400 font-bold cursor-pointer pt-1"
                      >
                        איפוס דוגמה ↻
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* ================= 6. קובץ הכלים החכמים (SiteTools) ================= */}
        <SiteTools
          accent={accent}
          setAccent={setAccent}
          lang={lang}
          setLang={setLang}
          isDark={isDark}
        />

        {/* ================= 7. יתרונות אפליקציה מותאמת אישית ================= */}
        <section className={`border rounded-2xl p-5 space-y-3 ${bgCard}`}>
          <h3 className="text-base sm:text-lg font-black">
            {lang === "he"
              ? "למה אפליקציה מותאמת אישית?"
              : "Why a Custom-Built App?"}
          </h3>

          <div className="space-y-2 text-xs">
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${bgSubCard}`}>
              <span className="font-bold">קבלת פניות והזמנות</span>
              <span className="text-emerald-400 font-bold text-left">מסודר וזמין בנייד ✓</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${bgSubCard}`}>
              <span className="font-bold">התאמה לתהליך העבודה</span>
              <span className="text-emerald-400 font-bold text-left">בנוי לפי הצורך שלך ✓</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${bgSubCard}`}>
              <span className="font-bold">שימוש נוח ללקוחות</span>
              <span className="text-emerald-400 font-bold text-left">ממשק מהיר ופשוט ✓</span>
            </div>
          </div>
        </section>

        {/* ================= 8. שאלון התאמה קצר ================= */}
        <section className={`border rounded-2xl p-5 space-y-4 ${bgCard}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black">
              {lang === "he"
                ? "איזו מערכת מתאימה לעסק שלך?"
                : "Which System Fits Your Business?"}
            </h3>
            {quizStep > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuizStep(0);
                  setQuizAnswers({ goal: "", clients: "", management: "" });
                }}
                className="text-xs opacity-70 hover:opacity-100 underline cursor-pointer"
              >
                התחל מחדש
              </button>
            )}
          </div>

          {quizStep === 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold">שאלה 1 מתוך 3: מה המטרה העיקרית שלך?</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "תורים ויומן לקוחות",
                  "מכירות והזמנות אונליין",
                  "השקת רעיון חדש (MVP)",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setQuizAnswers({ ...quizAnswers, goal: opt });
                      setQuizStep(1);
                    }}
                    className={`p-3 rounded-xl border text-right text-xs font-bold transition cursor-pointer ${bgSubCard}`}
                  >
                    {opt} ←
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep === 1 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold">שאלה 2 מתוך 3: איך הלקוחות פונים אליך היום?</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "בעיקר בוואטסאפ ובטלפון",
                  "דרך הרשתות החברתיות / הגעה פיזית",
                  "עדיין בשלב הרעיון",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setQuizAnswers({ ...quizAnswers, clients: opt });
                      setQuizStep(2);
                    }}
                    className={`p-3 rounded-xl border text-right text-xs font-bold transition cursor-pointer ${bgSubCard}`}
                  >
                    {opt} ←
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep === 2 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold">שאלה 3 מתוך 3: מה הכי חשוב לך במערכת?</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "ניהול שעות, מוצרים ולקוחות",
                  "קבלת פניות מסודרות לנייד",
                  "ממשק פשוט וקל לתפעול",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setQuizAnswers({ ...quizAnswers, management: opt });
                      setQuizStep(3);
                    }}
                    className={`p-3 rounded-xl border text-right text-xs font-bold transition cursor-pointer ${bgSubCard}`}
                  >
                    {opt} ←
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep === 3 && (
            <div className={`rounded-xl border p-4 space-y-3 ${theme.heroBg}`}>
              <h4 className="text-base font-black">{getQuizRecommendation().title}</h4>
              <p className={`text-xs leading-relaxed ${textMuted}`}>
                {getQuizRecommendation().desc}
              </p>
              <button
                type="button"
                onClick={handleSendQuizToWhatsApp}
                className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer ${theme.btn}`}
              >
                שלח את הבחירה לגילעד בוואטסאפ 📲
              </button>
            </div>
          )}
        </section>

        {/* ================= 9. טופס יצירת קשר ================= */}
        <section id="contact" className={`border rounded-2xl p-6 space-y-4 scroll-mt-20 ${bgCard}`}>
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black">
              {lang === "he" ? "השאר פרטים ונחזור אליך" : "Leave Details & I'll Get Back to You"}
            </h3>
            <p className={`text-xs ${textMuted}`}>
              {lang === "he"
                ? "מלא פרטים קצרים וההודעה תישלח ישירות לוואטסאפ"
                : "Fill in your details and send directly to WhatsApp"}
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
              {lang === "he" ? "טלפון:" : "Phone:"}{" "}
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

      {/* ================= כפתור וואטסאפ צף ================= */}
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

      {/* ================= תפריט ניווט תחתון ================= */}
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
          <a href="#projects" className={`flex flex-col items-center gap-0.5 py-1 text-[11px] transition ${textMuted}`}>
            <span className="text-base">🖼️</span>
            <span>{lang === "he" ? "פרויקטים" : "Projects"}</span>
          </a>
          <a href="#sandbox" className={`flex flex-col items-center gap-0.5 py-1 text-[11px] transition ${textMuted}`}>
            <span className="text-base">📱</span>
            <span>{lang === "he" ? "דוגמה" : "Preview"}</span>
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