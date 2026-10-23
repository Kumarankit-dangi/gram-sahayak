import { useState } from "react";
import { useStore } from "../store";
import { VILLAGE, DEMOGRAPHY, NEARBY_VILLAGES, CONNECTIVITY, SERVICES_BANK_POST, HEALTH_FACILITIES, TRAVEL, CERTIFICATE_SERVICES, DEFAULT_EMERGENCY, DUMARIA, DUMARIA_DEMOGRAPHY, DUMARIA_VILLAGES, LAND_SERVICES } from "../data/village";
const dumaria = DUMARIA;
import { IconArrow, IconPhone, IconSearch } from "./Icons";
import { PageTitle } from "./Shell";

export const useT = (lang: string) => (en: string, hi: string) => (lang === "hi" ? hi : en);

export function Home() {
  const { navigate, lang } = useStore();
  const t = useT(lang);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gov-green via-gov-green-2 to-gov-blue text-white">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl float-soft" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gov-gold/20 rounded-full blur-3xl" />
        <div className="relative max-w-[1400px] mx-auto px-3 sm:px-6 py-16 sm:py-24 lg:py-32 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-gov-gold animate-pulse" />
              {t("Smart Block Demo Portal", "स्मार्ट ब्लॉक डेमो पोर्टल")}
            </div>
            <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Dumaria Prakhand
            </h1>
            <p className="mt-2 text-2xl sm:text-3xl text-gov-gold font-semibold">डुमरिया प्रखंड</p>
            <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed">
              {t("Your Digital Gateway to a Smarter Block. 124 villages, schemes, complaints and block information — all in one place for Dumaria.", "आपका डिजिटल ब्लॉक द्वार। 124 गांव, योजनाएं, शिकायतें और ब्लॉक जानकारी — सब एक जगह।")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate({ page: "services" })} className="group bg-white text-gov-green px-6 py-3.5 rounded-xl font-bold hover:bg-gov-gold hover:text-white transition inline-flex items-center gap-2">
                {t("Explore Services", "सेवाएं देखें")}
                <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate({ page: "complaint" })} className="bg-gov-blue-2 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-gov-blue transition">
                {t("Register Complaint", "शिकायत दर्ज करें")}
              </button>
              <button onClick={() => navigate({ page: "schemes" })} className="bg-white/15 backdrop-blur text-white px-6 py-3.5 rounded-xl font-bold hover:bg-white/25 transition border border-white/30">
                {t("Government Schemes", "सरकारी योजनाएं")}
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <Stat n={DUMARIA.population.toLocaleString("en-IN")} l={t("Block Population", "ब्लॉक जनसंख्या")} />
              <Stat n={DUMARIA.households.toLocaleString("en-IN")} l={t("Households", "परिवार")} />
              <Stat n={`${DUMARIA.totalVillages}`} l={t("Villages", "गांव")} />
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl">🏛️</div>
                <div>
                  <div className="font-bold text-xl">{DUMARIA.name} {t("Block", "प्रखंड")}</div>
                  <div className="text-white/80 text-sm">{DUMARIA.district}, {DUMARIA.state} – {DUMARIA.pincode}</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <InfoRow k={t("Total Area", "कुल क्षेत्र")} v={DUMARIA.totalArea} />
                <InfoRow k={t("Villages", "कुल गांव")} v={`${DUMARIA.totalVillages}`} />
                <InfoRow k={t("Subdivision", "उप-विभाग")} v={DUMARIA.name} />
                <InfoRow k={t("District", "जिला")} v={DUMARIA.district} />
                <InfoRow k={t("Sex Ratio", "लिंगानुपात")} v={`${DUMARIA.sexRatio}`} />
                <InfoRow k={t("Literacy", "साक्षरता")} v={DUMARIA.literacyRate} />
              </div>
              <button onClick={() => navigate({ page: "village" })} className="mt-6 w-full bg-white text-gov-green py-3 rounded-xl font-bold hover:bg-gov-gold hover:text-white transition">
                {t("View All Villages & Block Info", "सभी गांव और ब्लॉक जानकारी")} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <ActionCard icon="📝" label={t("File Complaint", "शिकायत करें")} onClick={() => navigate({ page: "complaint" })} color="bg-gov-blue" />
          <ActionCard icon="📊" label={t("Track Status", "स्थिति देखें")} onClick={() => navigate({ page: "track" })} color="bg-gov-green" />
          <ActionCard icon="💼" label={t("Certificates", "प्रमाणपत्र")} onClick={() => navigate({ page: "services" })} color="bg-gov-gold" />
          <ActionCard icon="🚨" label={t("Emergency", "आपातकाल")} onClick={() => navigate({ page: "emergency" })} color="bg-gov-red" />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: t("Block & Villages", "ब्लॉक और गांव"), text: t("Complete Dumaria block data + all 124 villages with census info.", "पूरी डुमरिया ब्लॉक जानकारी + सभी 124 गांव।"), icon: "🏛️", r: "village" },
            { title: t("Government Schemes", "सरकारी योजनाएं"), text: t("PM Awas, PM-KISAN, pensions, Jal Jeevan and more with eligibility.", "PM आवास, PM-किसान, पेंशन और अन्य योजनाओं की जानकारी।"), icon: "🏛️", r: "schemes" },
            { title: t("Complaint System", "शिकायत प्रणाली"), text: t("Report road, water, electricity issues and track their resolution.", "सड़क, पानी, बिजली आदि की शिकायत दर्ज करें और स्थिति जानें।"), icon: "📢", r: "complaint" },
            { title: t("Notice Board", "सूचना बोर्ड"), text: t("Latest panchayat notices, meetings, camps and announcements.", "पंचायत सूचनाएं, बैठक, शिविर और घोषणाएं।"), icon: "📋", r: "notices" },
          ].map(c => (
            <button key={c.title} onClick={() => navigate({ page: c.r } as any)} className="group bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all ring-1 ring-gray-200 hover:ring-gov-green/30">
              <div className="text-4xl">{c.icon}</div>
              <h3 className="mt-4 font-bold text-lg text-ink group-hover:text-gov-green transition">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{c.text}</p>
              <div className="mt-4 text-sm font-semibold text-gov-green inline-flex items-center gap-1">
                {t("Explore", "देखें")} <IconArrow className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Emergency strip */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-16">
        <div className="bg-gradient-to-r from-gov-red to-red-700 text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">🚨</div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">{t("Emergency Contacts", "आपातकालीन संपर्क")}</h2>
              <p className="text-white/90 mt-1">{t("Quick access to police, ambulance, hospital and department contacts.", "पुलिस, एम्बुलेंस, अस्पताल और विभागों के संपर्क।")}</p>
            </div>
          </div>
          <button onClick={() => navigate({ page: "emergency" })} className="bg-white text-gov-red px-7 py-3.5 rounded-xl font-bold hover:bg-red-50 transition shrink-0">
            {t("View All Contacts", "सभी संपर्क देखें")}
          </button>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
      <div className="font-bold text-xl sm:text-2xl">{n}</div>
      <div className="text-xs text-white/75 mt-1">{l}</div>
    </div>
  );
}
function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-b border-white/10 pb-2">
      <div className="text-white/60 text-xs">{k}</div>
      <div className="font-semibold mt-0.5">{v}</div>
    </div>
  );
}
function ActionCard({ icon, label, onClick, color }: { icon: string; label: string; onClick: () => void; color: string }) {
  return (
    <button onClick={onClick} className={`${color} text-white rounded-2xl p-5 text-left hover:scale-[1.03] transition-transform shadow-lg`}>
      <div className="text-3xl">{icon}</div>
      <div className="font-bold mt-3 text-sm sm:text-base">{label}</div>
    </button>
  );
}

export function VillageInfo() {
  const { lang } = useStore();
  const [tab, setTab] = useState("block");
  const T = useT(lang);
  return (
    <div>
      <PageTitle title={T("Block & Village Information", "ब्लॉक और गांव की जानकारी")} subtitle={T("Complete Dumaria block data + all 124 villages — Kolhubar shown as an example village.", "डुमरिया ब्लॉक की पूरी जानकारी + सभी 124 गांव, कोल्हुबर एक उदाहरण गांव के रूप में।")} badge={T("Census 2011 Data", "जनगणना 2011 डेटा")} />
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {[
            ["block", "Dumaria Block", "डुमरिया ब्लॉक"],
            ["villages", "All 124 Villages", "सभी 124 गांव"],
            ["kolhubar", "Kolhubar (Example)", "कोल्हुबर (उदाहरण गांव)"],
            ["map", "Location / Map", "स्थान / नक्शा"],
          ].map(([k, en, hi]) => (
            <button key={k} onClick={() => setTab(k)} className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-semibold text-sm transition ${tab === k ? "bg-gov-green text-white" : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"}`}>
              {lang === "hi" ? hi : en}
            </button>
          ))}
        </div>

        {tab === "block" && <DumariaBlockTab T={T} />}
        {tab === "villages" && <VillagesTable T={T} />}
        {tab === "kolhubar" && <KolhubarTab T={T} />}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900 mt-4 shadow-sm">
          <strong>📌 Parkhand Dumariya (डुमरिया प्रखंड):</strong> {T("All 124 villages of Dumaria Subdivision fall under this Prakhand.", "डुमरिया उप-विभाग के सभी 124 गांव इस प्रखंड के अंतर्गत आते हैं।")}
        </div>
        {tab === "map" && <MapTab T={T} />}
      </div>
    </div>
  );
}

function KolhubarTab({ T }: any) {
  const [inner, setInner] = useState("stats");
  return (
    <div>
      <div className="flex gap-2 mb-6">
        {[
          ["stats", T("Village Stats", "गांव स्टैट")],
          ["demographics", T("Demographics", "जनांकिकी")],
          ["nearby", T("Nearby Villages", "पास के गांव")],
          ["connectivity", T("Connectivity", "संपर्क मार्ग")],
          ["facilities", T("Facilities", "सुविधाएं")],
        ].map(([k, l]) => (
          <button key={k} onClick={() => setInner(k)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${inner === k ? "bg-gov-green text-white" : "bg-gray-100 text-gray-700"}`}>
            {l}
          </button>
        ))}
      </div>
      {inner === "stats" && <Overview T={T} />}
      {inner === "demographics" && <Demographics T={T} />}
      {inner === "nearby" && <Nearby T={T} />}
      {inner === "connectivity" && <ConnectivityTab T={T} />}
      {inner === "facilities" && <Facilities T={T} />}
    </div>
  );
}

function DumariaBlockTab({ T }: any) {
  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-gradient-to-br from-gov-green to-gov-green-2 text-white rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🏛️</div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider text-white/70 font-bold">{T("Block / Subdivision", "ब्लॉक / उप-विभाग")}</div>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">{dumaria.name} {T("Block", "प्रखंड")} • {dumaria.hindi}</h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div><span className="text-white/70">{T("District", "जिला")}:</span> {dumaria.district}</div>
              <div><span className="text-white/70">{T("State", "राज्य")}:</span> {dumaria.state}</div>
              <div><span className="text-white/70">{T("Pincode", "पिनकोड")}:</span> {dumaria.pincode}</div>
              <div><span className="text-white/70">{T("Division", "प्रमंडल")}:</span> {dumaria.division}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { k: T("Total Area", "कुल क्षेत्र"), v: dumaria.totalArea, icon: "🌾" },
          { k: T("Total Villages", "कुल गांव"), v: dumaria.totalVillages, icon: "🏘️" },
          { k: T("Population (2011)", "जनसंख्या (2011)"), v: dumaria.population.toLocaleString("en-IN"), icon: "👥" },
          { k: T("Households", "परिवार"), v: dumaria.households.toLocaleString("en-IN"), icon: "🏠" },
          { k: T("Male Population", "पुरुष"), v: dumaria.malePop.toLocaleString("en-IN"), icon: "♂️" },
          { k: T("Female Population", "महिला"), v: dumaria.femalePop.toLocaleString("en-IN"), icon: "♀️" },
          { k: T("Density", "घनत्व"), v: `${dumaria.density}/km²`, icon: "📊" },
          { k: T("Sex Ratio", "लिंगानुपात"), v: `${dumaria.sexRatio}/1000`, icon: "⚖️" },
          { k: T("Literate", "साक्षर"), v: dumaria.literate.toLocaleString("en-IN"), icon: "📚" },
          { k: T("Child (0-6)", "बाल (0-6)"), v: dumaria.childPop.toLocaleString("en-IN"), icon: "👶" },
          { k: T("SC Population", "अनुसूचित जाति"), v: dumaria.scPop.toLocaleString("en-IN"), icon: "📋" },
          { k: T("ST Population", "अनुसूचित जनजाति"), v: dumaria.stPop.toLocaleString("en-IN"), icon: "📋" },
        ].map(c => (
          <div key={c.k} className="bg-white rounded-2xl p-5 ring-1 ring-gray-200">
            <div className="text-3xl">{c.icon}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-3">{c.k}</div>
            <div className="font-bold text-lg mt-1 text-ink">{c.v}</div>
          </div>
        ))}
      </div>

      {/* Connectivity */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 ring-1 ring-gray-200">
          <h3 className="font-bold text-lg mb-4">{T("Connectivity", "संपर्क मार्ग")}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2"><span className="text-gray-600">{T("Nearest Railway", "रेलवे स्टेशन")}:</span><span className="font-semibold">{dumaria.nearestRailway}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-gray-600">{T("Nearest Airport", "हवाई अड्डा")}:</span><span className="font-semibold">{dumaria.nearestAirport}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">{T("Town Population", "शहर जनसंख्या")}:</span><span className="font-semibold">{dumaria.townPop.toLocaleString("en-IN")}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 ring-1 ring-gray-200">
          <h3 className="font-bold text-lg mb-4">{T("Nearby Subdivisions", "पास के उपविभाग")}</h3>
          <div className="flex flex-wrap gap-2">
            {dumaria.nearbySubdivisions.map(s => (
              <span key={s} className="text-xs font-semibold bg-gov-blue/5 text-gov-blue px-3 py-1.5 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Demographics table */}
      <div className="bg-white rounded-2xl overflow-hidden ring-1 ring-gray-200">
        <div className="p-5 border-b border-gray-200 font-bold">{T("Dumaria Subdivision Demographics", "डुमरिया उप-विभाग जनांकिकी")}</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-4 font-bold">{T("Category", "श्रेणी")}</th>
                <th className="text-left p-4 font-bold">{T("Total", "कुल")}</th>
                <th className="text-left p-4 font-bold">{T("Male", "पुरुष")}</th>
                <th className="text-left p-4 font-bold">{T("Female", "महिला")}</th>
              </tr>
            </thead>
            <tbody>
              {DUMARIA_DEMOGRAPHY.map(d => (
                <tr key={d.label} className="border-t border-gray-100">
                  <td className="p-4 font-medium">{d.label}</td>
                  <td className="p-4">{d.total}</td>
                  <td className="p-4">{d.male}</td>
                  <td className="p-4">{d.female}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function LandRecords() {
  const { lang } = useStore();
  const T = useT(lang);
  return (
    <div>
      <PageTitle
        title={T("Land Records (भूमि विभाग)", "भूमि विभाग")}
        subtitle={T("Official land record services of Bihar — Jamabandi, Bhu-Naksha, Mutation, LPC, tax payment and more.", "बिहार के आधिकारिक भूमि सेवाएं — जमाबंदी, भू-नक्शा, दाखिल खारिज, एलपीसी, लगान भुगतान आदि।")}
      />
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-16 space-y-6">
        {/* Warning */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="font-bold text-amber-900">{T("Important Note", "महत्वपूर्ण नोट")}</div>
              <p className="text-sm text-amber-800 mt-1">
                {T("This page only guides you to the OFFICIAL Bihar Bhulekh portals. The government database is not hosted anywhere else. Never pay without verifying the official site.", "यह पेज केवल आधिकारिक बिहार भूलेख पोर्टल्स पर ले जाता है। सरकारी डेटाबेस इसके अलावा कहीं नहीं है। कृपया केवल आधिकारिक वेबसाइट से जुड़ें।")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAND_SERVICES.map(s => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group bg-white rounded-2xl p-6 ring-1 ring-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all ring-gov-green/0 hover:ring-gov-green/20"
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl">{s.icon}</div>
                <span className="text-xs font-bold text-gov-blue bg-gov-blue/5 px-2.5 py-1 rounded-full">↗️ Official</span>
              </div>
              <h3 className="mt-4 font-bold text-lg text-ink group-hover:text-gov-green transition">{s.name}</h3>
              <div className="text-sm font-semibold text-gov-green mt-0.5">{s.hindi}</div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gov-blue">
                {T("Open Official Portal", "आधिकारिक पोर्टल")}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* How to check */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-gray-200">
          <h3 className="font-bold text-xl">{T("How to check your land records?", "अपनी भूमि की जानकारी कैसे देखें?")}</h3>
          <ol className="mt-4 space-y-3 text-sm text-gray-700 leading-relaxed">
            <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 bg-gov-green text-white rounded-full flex items-center justify-center text-xs font-bold">1</span> {T("Open biharbhumi.bihar.gov.in (Jamabandi) or bhubhumi.bihar.gov.in (Bhu-Naksha).", "biharbhumi.bihar.gov.in (जमाबंदी) या bhubhumi.bihar.gov.in (भू-नक्शा) खोलें।")}</li>
            <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 bg-gov-green text-white rounded-full flex items-center justify-center text-xs font-bold">2</span> {T("Select District: Gaya, Subdivision: Dumaria, Mauza: Your village (Kolhubar or any of 124).", "जिला: गया, उप-विभाग: डुमरिया, मौजा: कोल्हुबर या कोई भी गांव (124 में से)।")}</li>
            <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 bg-gov-green text-white rounded-full flex items-center justify-center text-xs font-bold">3</span> {T("Search by Khata number, Khesra number or your name.", "खाता नंबर, खेसरा नंबर या अपने नाम से खोजें।")}</li>
            <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 bg-gov-green text-white rounded-full flex items-center justify-center text-xs font-bold">4</span> {T("View your land record, share any corrections with your local Revenue staff / Bhulekh officer.", "भूमि की जानकारी देखें। त्रुटि हो तो राजस्व कर्मचारी से संपर्क करें।")}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function VillagesTable({ T }: any) {
  const [q, setQ] = useState("");
  const [panch, setPanch] = useState("All");
  const panchayats = ["All", ...Array.from(new Set(DUMARIA_VILLAGES.map(v => v.panchayat)))];
  const filtered = DUMARIA_VILLAGES.filter(v =>
    (panch === "All" || v.panchayat === panch) &&
    (!q || v.name.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div>
      <div className="bg-white rounded-2xl p-4 ring-1 ring-gray-200 flex flex-col sm:flex-row gap-3 sm:items-center mb-6">
        <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
          <IconSearch className="w-4 h-4 text-gray-500" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder={T("Search village...", "गांव खोजें...")} className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <select value={panch} onChange={e => setPanch(e.target.value)} className="bg-gray-50 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none">
          {panchayats.map(p => <option key={p}>{p}</option>)}
        </select>
        <span className="text-sm text-gray-500">{filtered.length} villages</span>
      </div>

      <div className="bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-4 font-bold">#</th>
                <th className="text-left p-4 font-bold">{T("Village Name", "गांव का नाम")}</th>
                <th className="text-left p-4 font-bold">{T("Category", "श्रेणी")}</th>
                <th className="text-left p-4 font-bold">{T("Gram Panchayat", "ग्राम पंचायत")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="p-4 text-gray-500">{i + 1}</td>
                  <td className="p-4 font-semibold">{v.name}</td>
                  <td className="p-4">{v.category}</td>
                  <td className="p-4">{v.panchayat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-8 text-center text-gray-500">{T("No villages found.", "कोई गांव नहीं मिला।")}</div>}
      </div>
    </div>
  );
}

function MapTab({ T }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 ring-1 ring-gray-200">
        <h3 className="font-bold text-lg mb-2">{T("Dumaria Block — Location", "डुमरिया ब्लॉक — स्थान")}</h3>
        <p className="text-sm text-gray-600">
          {T("Dumaria, Gaya district, Bihar. Use the map below to open live directions.", "डुमरिया, गया जिला, बिहार। नक्शे पर क्लिक करें।")}
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden ring-1 ring-gray-200 aspect-video">
        <iframe
          src="https://www.google.com/maps?q=Dumaria%2C%20Gaya%2C%20Bihar&z=11&output=embed"
          className="w-full h-full"
          loading="lazy"
          title="Dumaria Block Map"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <a href="https://www.google.com/maps/dir/?api=1&destination=Dumaria,+Gaya,+Bihar" target="_blank" rel="noreferrer" className="bg-gov-blue text-white rounded-2xl p-5 text-center font-bold hover:bg-gov-blue-2 transition">
          🗺️ {T("Get Directions", "मार्ग देखें")}
        </a>
        <a href="https://www.google.com/maps?q=Birsa+Munda+Airport" target="_blank" rel="noreferrer" className="bg-white text-ink rounded-2xl p-5 text-center font-semibold ring-1 ring-gray-200 hover:bg-gray-50 transition">
          ✈️ {T("Birsa Munda Airport", "बिरसा मुंडा हवाई अड्डा")}
        </a>
        <a href="https://www.google.com/maps?q=Nabenagar+Road+Railway+Station" target="_blank" rel="noreferrer" className="bg-white text-ink rounded-2xl p-5 text-center font-semibold ring-1 ring-gray-200 hover:bg-gray-50 transition">
          🚆 {T("Nabenagar Road Station", "नबेनगर रोड स्टेशन")}
        </a>
      </div>
    </div>
  );
}

function Overview({ T }: any) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { k: T("Village Name", "गांव का नाम"), v: VILLAGE.name, icon: "🏡" },
        { k: T("Gram Panchayat", "ग्राम पंचायत"), v: VILLAGE.gramPanchayat, icon: "🏛️" },
        { k: T("Subdivision", "उप-विभाग"), v: VILLAGE.subdivision, icon: "🗂️" },
        { k: T("District", "जिला"), v: VILLAGE.district, icon: "🏙️" },
        { k: T("State", "राज्य"), v: VILLAGE.state, icon: "🗺️" },
        { k: T("Pincode", "पिनकोड"), v: VILLAGE.pincode, icon: "✉️" },
        { k: T("Village Code", "गांव कोड"), v: VILLAGE.villageCode, icon: "🔢" },
        { k: T("Total Area", "कुल क्षेत्र"), v: `${VILLAGE.areaHectares} ha`, icon: "🌾" },
        { k: T("Population", "जनसंख्या"), v: VILLAGE.population.toLocaleString("en-IN"), icon: "👥" },
        { k: T("Households", "परिवार"), v: VILLAGE.households.toLocaleString("en-IN"), icon: "🏠" },
        { k: T("Literacy Rate", "साक्षरता दर"), v: `${VILLAGE.literacyRate}%`, icon: "📚" },
        { k: T("Males", "पुरुष"), v: VILLAGE.malePopulation.toLocaleString("en-IN"), icon: "♂️" },
        { k: T("Females", "महिला"), v: VILLAGE.femalePopulation.toLocaleString("en-IN"), icon: "♀️" },
        { k: T("Nearest Town", "नजदीकी शहर"), v: VILLAGE.nearestTown, icon: "🏬" },
        { k: T("Nearest Railway", "रेलवे स्टेशन"), v: VILLAGE.nearestRailway, icon: "🚆" },
        { k: T("Nearest Airport", "हवाई अड्डा"), v: VILLAGE.nearestAirport, icon: "✈️" },
      ].map(c => (
        <div key={c.k} className="bg-white rounded-2xl p-5 ring-1 ring-gray-200">
          <div className="text-3xl">{c.icon}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-3">{c.k}</div>
          <div className="font-bold text-lg mt-1 text-ink">{c.v}</div>
        </div>
      ))}
    </div>
  );
}

function Demographics({ T }: any) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden ring-1 ring-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gov-green/5 text-gov-green">
            <tr>
              <th className="text-left p-4 font-bold">{T("Category", "श्रेणी")}</th>
              <th className="text-left p-4 font-bold">{T("Total", "कुल")}</th>
              <th className="text-left p-4 font-bold">{T("Male", "पुरुष")}</th>
              <th className="text-left p-4 font-bold">{T("Female", "महिला")}</th>
            </tr>
          </thead>
          <tbody>
            {DEMOGRAPHY.map(d => (
              <tr key={d.label} className="border-t border-gray-100">
                <td className="p-4 font-medium">{d.label}</td>
                <td className="p-4">{d.total}</td>
                <td className="p-4">{d.male}</td>
                <td className="p-4">{d.female}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Nearby({ T }: any) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {NEARBY_VILLAGES.map(v => (
        <div key={v.name} className="bg-white rounded-xl p-4 ring-1 ring-gray-200 flex items-center justify-between">
          <div>
            <div className="font-semibold">{v.name}</div>
            <div className="text-xs text-gray-500">{T("Direction", "दिशा")}: {v.direction}</div>
          </div>
          <span className="text-sm font-bold text-gov-green bg-gov-green/5 px-3 py-1.5 rounded-lg">{v.distance}</span>
        </div>
      ))}
    </div>
  );
}

function ConnectivityTab({ T }: any) {
  return (
    <div className="grid gap-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {CONNECTIVITY.map(c => (
          <div key={c.item} className="bg-white rounded-xl p-5 ring-1 ring-gray-200">
            <div className="font-semibold">{c.item}</div>
            <div className="mt-2 flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${(c.status as string) === "Yes" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {c.status}
              </span>
              <span className="text-sm text-gray-600">{c.nearest}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-5 ring-1 ring-gray-200">
        <div className="font-bold text-lg mb-4">{T("Travel Time", "यात्रा का समय")}</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {TRAVEL.map(t => (
            <div key={t.from} className="border border-gray-200 rounded-xl p-4">
              <div className="text-sm text-gray-500">{T("From", "से")} {t.from}</div>
              <div className="font-bold text-lg mt-1">{t.distance} · {t.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Facilities({ T }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-5 ring-1 ring-gray-200">
        <h3 className="font-bold text-lg mb-4">{T("Banking & Postal", "बैंकिंग और डाक")}</h3>
        <div className="space-y-3">
          {SERVICES_BANK_POST.map(f => (
            <div key={f.item} className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-medium">{f.item}</span>
              <div className="text-right">
                <span className={`text-xs font-bold px-2 py-1 rounded ${String(f.status) === "Yes" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{f.status}</span>
                <div className="text-xs text-gray-500 mt-1">{f.nearest}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 ring-1 ring-gray-200">
        <h3 className="font-bold text-lg mb-4">{T("Health Facilities", "स्वास्थ्य सुविधाएं")}</h3>
        <div className="space-y-3">
          {HEALTH_FACILITIES.map(f => (
            <div key={f.item} className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-medium">{f.item}</span>
              <div className="text-right">
                <span className={`text-xs font-bold px-2 py-1 rounded ${(f.status as string) === "Yes" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{f.status}</span>
                <div className="text-xs text-gray-500 mt-1">{f.nearest}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const { lang } = useStore();
  const T = useT(lang);
  return (
    <div>
      <PageTitle title={T("Digital Services", "डिजिटल सेवाएं")} subtitle={T("Certificate and document-related services available through the village and nearest offices.", "प्रमाणपत्र और दस्तावेज़ संबंधित सेवाएं।")} />
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTIFICATE_SERVICES.map(s => (
          <div key={s.name} className="bg-white rounded-2xl p-6 ring-1 ring-gray-200 hover:ring-gov-green/30 hover:shadow-lg transition-all">
            <div className="text-4xl">{s.icon}</div>
            <h3 className="mt-4 font-bold text-lg text-ink">{s.name}</h3>
            <p className="mt-2 text-sm text-gray-600">{s.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs uppercase text-gray-500 font-bold">{T("Required Documents", "आवश्यक दस्तावेज़")}</div>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{s.documents}</p>
              <div className="text-xs uppercase text-gray-500 font-bold mt-3">{T("Application Info", "आवेदन जानकारी")}</div>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{s.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Schemes() {
  const { schemes, lang } = useStore();
  const T = useT(lang);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(schemes.map(s => s.category)))];
  const filtered = schemes.filter(s =>
    (cat === "All" || s.category === cat) &&
    (!q || s.name.toLowerCase().includes(q.toLowerCase()) || s.description.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div>
      <PageTitle title={T("Government Schemes", "सरकारी योजनाएं")} subtitle={T("Central and state schemes for all 124 villages of Dumaria Block.", "डुमरिया ब्लॉक के सभी 124 गांवों के लिए केंद्र और राज्य योजनाएं।")} />
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6">
        <div className="bg-white rounded-2xl p-4 ring-1 ring-gray-200 flex flex-col sm:flex-row gap-3 sm:items-center mb-6">
          <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
            <IconSearch className="w-4 h-4 text-gray-500" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder={T("Search schemes...", "योजना खोजें...")} className="flex-1 bg-transparent outline-none text-sm" />
          </div>
          <select value={cat} onChange={e => setCat(e.target.value)} className="bg-gray-50 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none">
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(s => (
            <div key={s.id} className="bg-white rounded-2xl p-6 ring-1 ring-gray-200 hover:shadow-lg transition-all flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-gov-blue bg-gov-blue/5 px-3 py-1 rounded-full self-start">{s.category}</span>
              <h3 className="mt-4 font-bold text-lg">{s.name}</h3>
              <p className="mt-2 text-sm text-gray-600 flex-1">{s.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm space-y-2">
                <div><span className="text-gray-500">{T("Eligibility:", "योग्यता:")}</span> {s.eligibility}</div>
                <div><span className="text-gray-500">{T("Benefits:", "लाभ:")}</span> {s.benefits}</div>
                <div><span className="text-gray-500">{T("Documents:", "दस्तावेज़:")}</span> {s.documents}</div>
                <div className="pt-2"><span className="text-gray-500 font-semibold">{T("How to Apply:", "आवेदन कैसे करें:")}</span> {s.howToApply}</div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center text-gray-500 py-12">{T("No schemes found.", "कोई योजना नहीं मिली।")}</div>}
      </div>
    </div>
  );
}

export function Emergency() {
  const { lang } = useStore();
  const T = useT(lang);
  return (
    <div>
      <PageTitle title={T("Emergency Contacts", "आपातकालीन संपर्क")} subtitle={T("Quick-access contact information for police, ambulance, hospital and departments.", "पुलिस, एम्बुलेंस, अस्पताल और विभागों के संपर्क।")} />
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEFAULT_EMERGENCY.map(e => (
            <div key={e.id} className="bg-white rounded-2xl p-6 ring-1 ring-gray-200 hover:shadow-lg transition-all">
              <div className="text-4xl">{e.icon}</div>
              <h3 className="mt-4 font-bold text-lg">{e.name}</h3>
              <div className="mt-3 text-2xl font-bold text-gov-red">{e.phone !== "—" ? e.phone : T("(Ask locally)", "(स्थानीय रूप से पूछें)")}</div>
              {e.phone !== "—" && (
                <a href={`tel:${e.phone}`} className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-gov-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition">
                  <IconPhone className="w-5 h-5" /> {T("Call Now", "कॉल करें")}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Notices() {
  const { notices, lang } = useStore();
  const T = useT(lang);
  return (
    <div>
      <PageTitle title={T("Village Notice Board", "गांव सूचना बोर्ड")} subtitle={T("Latest announcements, panchayat notices and public information.", "नवीनतम घोषणाएं और सूचनाएं।")} />
      <div className="max-w-[900px] mx-auto px-3 sm:px-6 space-y-4">
        {notices.map(n => (
          <article key={n.id} className="bg-white rounded-2xl p-6 ring-1 ring-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gov-blue bg-gov-blue/5 px-3 py-1 rounded-full">{n.category}</span>
                <h3 className="mt-3 font-bold text-lg">{n.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{n.description}</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">{T("Posted:", "डाक:")} {new Date(n.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
