export default function Home() {
  return (
    <main className="min-h-screen bg-[#060918] text-white relative overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
      {/* אפקטים של תאורה ברקע */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* תפריט עליון צף */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#060918]/75 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-cyan-500/25">
              גק
            </div>
            <div>
              <span className="text-lg font-bold tracking-wide block leading-none">
                גילעד קרליבך
              </span>
              <span className="text-xs text-cyan-400">App Development</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#services" className="hover:text-cyan-400 transition">
              שירותים
            </a>
            <a href="#process" className="hover:text-cyan-400 transition">
              תהליך העבודה
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition">
              יצירת קשר
            </a>
          </nav>

          <a
            href="https://wa.me/972527431770"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-l from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-cyan-500/20"
          >
            שיחת ייעוץ חינם
          </a>
        </div>
      </header>

      {/* חלק מרכזי (Hero) */}
      <section className="relative z-10 container mx-auto px-6 pt-16 pb-24 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* טקסט וכפתורים */}
          <div className="lg:col-span-7 text-right">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-300 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              פיתוח אפליקציות ומערכות חכמות
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.15]">
              הופכים רעיונות גדולים <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 via-sky-300 to-purple-400">
                לאפליקציות שעובדות
              </span>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              במיוחד לעסקים מתחילים וסטארטאפים: ליווי אישי מקצה לקצה — משלב האפיון והעיצוב ועד להשקת אפליקציה מהירה, מאובטחת ומוכנה ללקוחות אמיתיים.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/972527431770"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl text-lg transition shadow-xl shadow-emerald-500/25"
              >
                שלח הודעה בוואטסאפ
              </a>
              <a
                href="mailto:gilad.creating.apps@gmail.com"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition backdrop-blur-sm"
              >
                gilad.creating.apps@gmail.com
              </a>
            </div>
          </div>

          {/* כרטיס הדמיה ויזואלי בצד (בסגנון כרטיס הביקור) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/90 to-indigo-950/90 border border-white/15 p-7 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono text-cyan-400" dir="ltr">
                  &lt;GiladApps /&gt;
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">זמן השקה ממוצע</div>
                    <div className="text-lg font-bold text-white">פיתוח MVP מואץ</div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                    מהיר
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">טכנולוגיה</div>
                    <div className="text-lg font-bold text-white">Web, iOS &amp; Android</div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">
                    מודרני
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-l from-cyan-500/15 to-purple-500/15 border border-cyan-400/30">
                  <div className="text-sm font-bold text-cyan-300 mb-1">
                    יש לך רעיון בראש?
                  </div>
                  <div className="text-xs text-slate-300">
                    בוא נהפוך אותו למוצר עובד בלי לשרוף תקציבי ענק.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* שירותים */}
      <section id="services" className="relative z-10 container mx-auto px-6 py-20 max-w-6xl border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            מה אני בונה עבור העסק שלך?
          </h2>
          <p className="text-slate-400">
            פתרונות טכנולוגיים מדויקים שנועדו לעזור לעסקים בתחילת דרכם לצמוח מהר
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-cyan-500/40 p-8 rounded-3xl transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-mono font-bold text-xl mb-6">
              01
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">פיתוח MVP לסטארטאפים</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              בניית גרסה ראשונית חכמה וממוקדת של האפליקציה שלך, כדי שתוכל לצאת לשוק, לגייס משתמשים ראשונים ולהציג למשקיעים.
            </p>
          </div>

          <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-purple-500/40 p-8 rounded-3xl transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-mono font-bold text-xl mb-6">
              02
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">אפליקציות ניהול ועסקים</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              מערכות תורים, ניהול לקוחות, קטלוגים דיגיטליים ואוטומציות שחוסכות לך שעות של עבודה ידנית בכל שבוע.
            </p>
          </div>

          <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-emerald-500/40 p-8 rounded-3xl transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-mono font-bold text-xl mb-6">
              03
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">עיצוב UI/UX וחוויית משתמש</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              ממשקים נקיים, מהירים ומותאמים מושלם לנייד ולמחשב, שגורמים ללקוחות שלך ליהנות מכל לחיצה.
            </p>
          </div>
        </div>
      </section>

      {/* תהליך עבודה */}
      <section id="process" className="relative z-10 container mx-auto px-6 py-20 max-w-6xl border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            איך מתחילים?
          </h2>
          <p className="text-slate-400">
            תהליך פשוט, שקוף וברור מהשיחה הראשונה ועד שהאפליקציה באוויר
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "שלב 1", title: "שיחת היכרות ואפיון", desc: "מבינים את הצורך, מגדירים מטרות ובונים תוכנית פעולה מדויקת." },
            { step: "שלב 2", title: "עיצוב ואב-טיפוס", desc: "מתכננים את המסכים וחוויית המשתמש לפני שכותבים שורת קוד." },
            { step: "שלב 3", title: "פיתוח ובדיקות", desc: "בניית האפליקציה בטכנולוגיות מתקדמות עם עדכונים שוטפים." },
            { step: "שלב 4", title: "עלייה לאוויר וליווי", desc: "השקת המוצר בענן ותמיכה טכנית מלאה גם אחרי העלייה." },
          ].map((item) => (
            <div key={item.step} className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl">
              <span className="text-xs font-bold text-cyan-400 block mb-2">{item.step}</span>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* כרטיס יצירת קשר */}
      <section id="contact" className="relative z-10 container mx-auto px-6 py-20 max-w-3xl">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 border border-cyan-500/30 p-8 sm:p-12 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">גילעד קרליבך</h2>
          <p className="text-cyan-400 font-semibold text-lg mb-8">
            פיתוח אפליקציות לעסקים מתחילים
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/972527431770"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-2xl transition shadow-lg shadow-emerald-500/20"
            >
              וואטסאפ ישיר: 052-7431770
            </a>
            <a
              href="tel:0527431770"
              className="bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-8 py-4 rounded-2xl transition"
            >
              חיוג מהיר
            </a>
          </div>

          <p className="text-slate-300 text-sm">
            או במייל:{" "}
            <a
              href="mailto:gilad.creating.apps@gmail.com"
              className="text-cyan-400 hover:underline font-medium"
            >
              gilad.creating.apps@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* פוטר */}
      <footer className="relative z-10 text-center py-8 text-slate-500 text-sm border-t border-white/10">
        © 2026 גילעד קרליבך — פיתוח אפליקציות לעסקים מתחילים. כל הזכויות שמורות.
      </footer>
    </main>
  );
}