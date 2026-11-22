export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* סרגל עליון */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-800/50">
        <div className="text-xl font-bold tracking-wide text-cyan-400">
          גילעד קרליבך
        </div>
        <a
          href="#contact"
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2 rounded-full transition"
        >
          צור קשר
        </a>
      </header>

      {/* חלק מרכזי (Hero) */}
      <section className="container mx-auto px-6 py-16 text-center max-w-3xl">
        <span className="inline-block py-1 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm mb-6">
          פיתוח אפליקציות מותאמות אישית
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          פיתוח אפליקציות <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-purple-400">
            לעסקים מתחילים
          </span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
          יש לך רעיון לאפליקציה או צורך במערכת דיגיטלית לעסק החדש שלך? 
          אני מלווה עסקים מתחילים משלב הרעיון והאפיון ועד לאפליקציה עובדת באוויר — במהירות, במקצועיות ובתקציב מותאם.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/972527431770"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg transition shadow-lg shadow-emerald-500/20"
          >
            דבר איתי בוואטסאפ
          </a>
          <a
            href="mailto:gilad.creating.apps@gmail.com"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition"
          >
            שליחת אימייל
          </a>
        </div>
      </section>

      {/* יתרונות / מה אני מציע */}
      <section className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">פיתוח MVP מהיר</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              הוצאת גרסה ראשונית עובדת לשוק בזמן קצר, כדי שתוכל לבדוק את הרעיון מול לקוחות אמיתיים.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-purple-400 mb-2">התאמה לעסקים מתחילים</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              פתרונות חכמים ויעילים ללא הוצאות מיותרות, עם ליווי אישי בגובה העיניים לאורך כל הדרך.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">עיצוב וחוויית משתמש</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              ממשק מודרני, מהיר ונוח לשימוש שגורם ללקוחות שלך להישאר ולהשתמש באפליקציה.
            </p>
          </div>
        </div>
      </section>

      {/* כרטיס יצירת קשר */}
      <section id="contact" className="container mx-auto px-6 py-12 max-w-xl">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center backdrop-blur-sm shadow-xl">
          <h2 className="text-2xl font-bold mb-2">גילעד קרליבך</h2>
          <p className="text-cyan-400 mb-6">פיתוח אפליקציות לעסקים מתחילים</p>
          
          <div className="space-y-3 text-slate-300">
            <p>
              <strong>טלפון:</strong>{" "}
              <a href="tel:0527431770" className="hover:text-cyan-400 underline" dir="ltr">
                052-7431770
              </a>
            </p>
            <p>
              <strong>אימייל:</strong>{" "}
              <a
                href="mailto:gilad.creating.apps@gmail.com"
                className="hover:text-cyan-400 underline"
              >
                gilad.creating.apps@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* פוטר */}
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-800/60">
© 2026 גילעד קרליבך - כל הזכויות שמורות
      </footer>
    </main>
  );
}