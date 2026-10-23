import { useEffect, useState } from "react";
import { useStore, type Route } from "../store";
import { IconMenu, IconX, IconPhone, IconUser, IconMap, IconArrow } from "./Icons";

export function Header() {
  const { user, logout, navigate, lang, setLang } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const NAV: { label: string; labelHi: string; route: Route }[] = [
    { label: "Home", labelHi: "होम", route: { page: "home" } },
    { label: "Village Info", labelHi: "गांव की जानकारी", route: { page: "village" } },
    { label: "Services", labelHi: "सेवाएं", route: { page: "services" } },
    { label: "Schemes", labelHi: "योजनाएं", route: { page: "schemes" } },
    { label: "Land Records", labelHi: "भूमि विभाग", route: { page: "land" } },
    { label: "Complaint", labelHi: "शिकायत", route: { page: "complaint" } },
    { label: "Track Status", labelHi: "स्थिति देखें", route: { page: "track" } },
    { label: "Notices", labelHi: "सूचनाएं", route: { page: "notices" } },
    { label: "Emergency", labelHi: "आपातकाल", route: { page: "emergency" } },
  ];

  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <>
      {/* Top strip */}
      <div className="bg-gov-green text-white text-[11px] sm:text-xs px-3 sm:px-6 py-2 flex items-center gap-4">
        <div className="flex-1 overflow-hidden no-scrollbar whitespace-nowrap">{t("All types of village services • Schemes • Complaints • Notices", "सभी गांव सेवाएं • योजनाएं • शिकायतें • सूचनाएं")}</div>
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <span>{t("Dumaria Prakhand, Gaya – 824206", "डुमरिया प्रखंड, गया – 824206")}</span>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white"}`}>
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate({ page: "home" })} className="flex items-center gap-2.5 text-left">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-gov-green to-gov-green-2 text-white flex items-center justify-center font-bold text-lg shadow-md">
              डु
            </div>
            <div>
              <div className="font-bold text-gov-green leading-tight text-base sm:text-lg">Dumaria Prakhand</div>
              <div className="text-[10px] sm:text-xs text-gray-500 leading-tight">डुमरिया प्रखंड • {t("Smart Block Portal", "स्मार्ट ब्लॉक पोर्टल")}</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV.map(n => (
              <button
                key={n.label}
                onClick={() => navigate(n.route)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gov-green hover:bg-gov-green/5 rounded-lg transition"
              >
                {lang === "hi" ? n.labelHi : n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === "hi" ? "en" : "hi")}
              className="text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              aria-label="Switch language"
            >
              {lang === "hi" ? "EN" : "हिं"}
            </button>

            {user ? (
              <>
                <button
                  onClick={() => navigate(user.id === "admin" ? { page: "admin" } : { page: "account" })}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gov-green px-3 py-2 rounded-lg hover:bg-gov-green/5"
                >
                  <IconUser className="w-4 h-4" />
                  <span className="max-w-[120px] truncate">{user.name.split(" ")[0]}</span>
                </button>
                <button onClick={logout} className="text-xs sm:text-sm font-medium text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100">
                  {t("Logout", "लॉगआउट")}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate({ page: "login" })} className="hidden sm:inline-flex text-sm font-semibold text-gov-blue px-3 py-2 rounded-lg hover:bg-gov-blue/5">
                  {t("Login", "लॉगिन")}
                </button>
                <button onClick={() => navigate({ page: "register" })} className="hidden sm:inline-flex text-sm font-semibold bg-gov-green text-white px-4 py-2 rounded-lg hover:bg-gov-green-2 transition">
                  {t("Register", "रजिस्टर")}
                </button>
              </>
            )}

            <button onClick={() => setOpen(!open)} className="xl:hidden w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center justify-center" aria-label="Menu">
              {open ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="xl:hidden border-t border-gray-100 bg-white fade-in">
            <nav className="py-2">
              {NAV.map(n => (
                <button
                  key={n.label}
                  onClick={() => { navigate(n.route); setOpen(false); }}
                  className="w-full text-left px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gov-green/5 hover:text-gov-green flex items-center justify-between"
                >
                  {lang === "hi" ? n.labelHi : n.label}
                  <IconArrow className="w-4 h-4 text-gray-400" />
                </button>
              ))}
              {user ? (
                <>
                  <button onClick={() => { navigate(user.id === "admin" ? { page: "admin" } : { page: "account" }); setOpen(false); }} className="w-full text-left px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gov-green/5">
                    {user.id === "admin" ? "Admin Dashboard" : t("My Account", "मेरा खाता")}
                  </button>
                  <button onClick={() => { logout(); setOpen(false); }} className="w-full text-left px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50">
                    {t("Logout", "लॉगआउट")}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { navigate({ page: "login" }); setOpen(false); }} className="w-full text-left px-6 py-3 text-sm font-medium text-gov-blue hover:bg-gov-blue/5">
                    {t("Login", "लॉगिन")}
                  </button>
                  <button onClick={() => { navigate({ page: "register" }); setOpen(false); }} className="w-full text-left px-6 py-3 text-sm font-medium text-gov-green hover:bg-gov-green/5">
                    {t("Register", "रजिस्टर")}
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export function Footer() {
  const { navigate, lang } = useStore();
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  return (
    <footer className="bg-ink text-white mt-20">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gov-green text-white flex items-center justify-center font-bold">डु</div>
              <div>
                <div className="font-bold">Dumaria Prakhand</div>
                <div className="text-xs text-gray-400">डुमरिया प्रखंड</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              {t("Your digital gateway to a smarter block. Connecting all 124 villages of Dumaria with services, schemes, complaints and information.", "डुमरिया प्रखंड के सभी 124 गांवों को जोड़ने वाला डिजिटल पोर्टल।")}
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3">{t("Quick Links", "त्वरित लिंक")}</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Home", { page: "home" }], ["Village Info", { page: "village" }], ["Services", { page: "services" }], ["Schemes", { page: "schemes" }], ["Land Records", { page: "land" }], ["Complaint", { page: "complaint" }], ["Track Status", { page: "track" }], ["Notices", { page: "notices" }], ["Emergency", { page: "emergency" }],
              ].map(([l, r]) => (
                <li key={l as string}><button onClick={() => navigate(r as Route)} className="text-gray-300 hover:text-white transition">{t(l as string, l as string)}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3">{t("Block Office", "ब्लॉक कार्यालय")}</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2"><IconMap className="w-4 h-4 mt-0.5 text-gov-green-2" /> Dumaria, Gaya, Bihar – 824206</div>
              <div className="flex items-start gap-2"><IconPhone className="w-4 h-4 mt-0.5 text-gov-green-2" /> {t("124 villages", "124 गांव")}</div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3">{t("Demo Notice", "डेमो नोटिस")}</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("This is a student/portfolio demo portal. Data is stored in your browser only. No official government affiliation.", "यह डेमो पोर्टल है। डेटा केवल ब्राउज़र में रहता है। कोई सरकारी लिंक नहीं है।")}
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Dumaria Prakhand – Smart Block Portal. {t("Demo build.", "डेमो")} </span>
          <span>Dumaria • Gaya • Bihar – 824206</span>
        </div>
      </div>
    </footer>
  );
}

export function PageTitle({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) {
  return (
    <div className="pt-10 pb-8 px-3 sm:px-6 max-w-[1400px] mx-auto">
      {badge && <span className="text-xs uppercase tracking-wider text-gov-blue font-bold bg-gov-blue/5 px-3 py-1 rounded-full">{badge}</span>}
      <h1 className="text-3xl sm:text-5xl font-bold text-ink mt-3">{title}</h1>
      {subtitle && <p className="mt-3 text-gray-600 max-w-2xl">{subtitle}</p>}
    </div>
  );
}
