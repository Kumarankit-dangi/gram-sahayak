import { useState } from "react";
import { useStore } from "../store";
import { useT } from "./PublicPages";
import { PageTitle } from "./Shell";
import { CATEGORY_LIST } from "../data/village";
import { IconCheck, IconSearch, IconPhone } from "./Icons";
import type { Complaint } from "../data/village";
import { BLOCK_CONTACT } from "../data/village";

// ==================== COMPLAINT FORM ====================
export function ComplaintPage() {
  const { addComplaint, user, navigate, lang } = useStore();
  const t = useT(lang);
  const [form, setForm] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    category: "Road" as string,
    description: "",
    location: "",
    image: "",
  });
  const [done, setDone] = useState<Complaint | null>(null);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.description || !form.location) {
      setErr(t("Please fill all required fields.", "कृपया सभी आवश्यक फ़ील्ड भरें।"));
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setErr(t("Enter a valid 10-digit mobile number.", "सही 10-अंकीय मोबाइल नंबर दर्ज करें।"));
      return;
    }
    const c = addComplaint({
      ...form,
      userId: user?.id,
    });
    setDone(c);
  };

  return (
    <div>
      <PageTitle title={t("Register Complaint", "शिकायत दर्ज करें")} subtitle={t("Report issues related to roads, water, electricity, sanitation or other village matters.", "सड़क, पानी, बिजली, सफाई आदि से जुड़ी समस्या दर्ज करें।")} />
      <div className="max-w-[700px] mx-auto px-3 sm:px-6 pb-16">
        {/* Direct Block Contact */}
        <div className="mb-6 bg-gov-blue/5 border-l-4 border-gov-blue rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gov-blue text-white flex items-center justify-center text-2xl">🏛️</div>
            <div className="flex-1">
              <div className="font-bold text-gov-blue">{BLOCK_CONTACT.name}</div>
              <p className="text-xs text-gray-600 mt-1">{BLOCK_CONTACT.address}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={`tel:${BLOCK_CONTACT.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 bg-gov-blue text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-gov-blue-2 transition">
                  <IconPhone className="w-3.5 h-3.5" /> {t("Call Block Office", "ब्लॉक कार्यालय को कॉल करें")}
                </a>
                <span className="inline-flex items-center text-xs text-gray-600">
                  {t("Complaint ID ", "शिकायत ID ")}{done ? done.id : "xxx"} {t("will be linked directly to the block records.", "सीधे ब्लॉक से जुड़ा होगा।")}
                </span>
              </div>
            </div>
          </div>
        </div>
        {done ? (
          <div className="bg-green-50 border-l-4 border-green-600 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-3xl mx-auto">✓</div>
            <h3 className="mt-4 font-bold text-xl text-green-900">{t("Complaint submitted successfully!", "शिकायत सफलतापूर्वक दर्ज हुई!")}</h3>
            <p className="mt-2 text-sm text-green-700">{t("Please save your Complaint ID for tracking:", "स्थिति देखने के लिए अपनी शिकायत ID सहेजें:")}</p>
            <div className="mt-3 inline-block bg-white rounded-xl px-6 py-3 font-mono font-bold text-lg text-green-800 border border-green-200">{done.id}</div>
            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={() => navigate({ page: "track" })} className="bg-gov-green text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gov-green-2 transition">
                {t("Track Status", "स्थिति देखें")}
              </button>
              <button onClick={() => { setDone(null); setForm({ name: user?.name || "", mobile: user?.mobile || "", category: "Road", description: "", location: "", image: "" }); }} className="bg-white text-gov-green px-5 py-2.5 rounded-xl font-semibold border border-gov-green hover:bg-gov-green/5 transition">
                {t("Register Another", "एक और दर्ज करें")}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-gray-200 space-y-5">
            {err && <div className="bg-red-50 text-red-700 border-l-4 border-red-500 p-3 rounded-xl text-sm">{err}</div>}

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={`${t("Full Name", "पूरा नाम")} *`} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              <Field label={`${t("Mobile Number", "मोबाइल नंबर")} *`} value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} required type="tel" pattern="[6-9][0-9]{9}" />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">{t("Category", "श्रेणी")} *</label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORY_LIST.map(c => (
                  <button type="button" key={c} onClick={() => setForm(f => ({ ...f, category: c }))}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition ${form.category === c ? "bg-gov-green text-white border-gov-green" : "bg-white text-gray-600 border-gray-300 hover:border-gov-green"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">{t("Description", "विवरण")} *</label>
              <textarea required rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder={t("Describe the issue clearly...", "समस्या का विवरण लिखें...")} className="mt-2 w-full bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-gov-green focus:outline-none" />
            </div>

            <Field label={`${t("Location / Landmark", "स्थान / लैंडमार्क")} *`} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required placeholder={t("e.g., Near school, Main road...", "जैसे, स्कूल के पास, मुख्य सड़क...")} />

            <button type="submit" className="w-full bg-gov-green text-white py-4 rounded-xl font-bold text-lg hover:bg-gov-green-2 transition">
              {t("Submit Complaint", "शिकायत जमा करें")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ==================== TRACK STATUS ====================
export function TrackPage() {
  const { getComplaint, lang } = useStore();
  const t = useT(lang);
  const [q, setQ] = useState("");
  const [result, setResult] = useState<Complaint | null>(null);
  const [err, setErr] = useState("");

  const search = () => {
    setErr("");
    if (!q.trim()) { setResult(null); return; }
    const c = getComplaint(q.trim().toUpperCase());
    if (!c) { setResult(null); setErr(t("No complaint found with this ID.", "इस ID से कोई शिकायत नहीं मिली।")); return; }
    setResult(c);
  };

  const STEPS = ["Submitted", "Under Review", "In Progress", "Resolved"] as const;

  return (
    <div>
      <PageTitle title={t("Track Complaint Status", "शिकायत की स्थिति देखें")} subtitle={t("Enter your Complaint ID to check its current progress.", "अपनी शिकायत ID दर्ज कर स्थिति देखें।")} />
      <div className="max-w-[700px] mx-auto px-3 sm:px-6 pb-16">
        <div className="bg-white rounded-2xl p-6 ring-1 ring-gray-200 flex gap-3">
          <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
            <IconSearch className="w-5 h-5 text-gray-500" />
            <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder={t("Enter Complaint ID (e.g., CMP-12345678-123)", "शिकायत ID दर्ज करें (जैसे, CMP-12345678-123)")} className="flex-1 bg-transparent outline-none font-mono text-sm" />
          </div>
          <button onClick={search} className="bg-gov-green text-white px-6 rounded-xl font-bold hover:bg-gov-green-2 transition">
            {t("Track", "देखें")}
          </button>
        </div>

        {err && <div className="mt-4 bg-red-50 text-red-700 border-l-4 border-red-500 p-4 rounded-xl text-sm">{err}</div>}

        {result && (
          <div className="mt-6 bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-gray-200 slide-up">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <div className="text-xs uppercase text-gray-500 font-bold">{t("Complaint ID", "शिकायत ID")}</div>
                <div className="font-mono font-bold text-xl mt-1">{result.id}</div>
              </div>
              <div className="text-right">
                <span className={`status-badge status-${result.status.toLowerCase().replace(" ", "")}`}>{result.status}</span>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
              <Info k={t("Name", "नाम")} v={result.name} />
              <Info k={t("Mobile", "मोबाइल")} v={result.mobile} />
              <Info k={t("Category", "श्रेणी")} v={result.category} />
              <Info k={t("Location", "स्थान")} v={result.location} />
              <Info k={t("Submitted On", "जमा दिनांक")} v={new Date(result.createdAt).toLocaleString("en-IN")} />
              <Info k={t("Last Updated", "अंतिम अपडेट")} v={new Date(result.updatedAt).toLocaleString("en-IN")} />
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100">
              <div className="text-sm font-semibold text-gray-700 mb-2">{t("Description", "विवरण")}</div>
              <p className="text-sm text-gray-600">{result.description}</p>
            </div>

            {/* Stepper */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="relative">
                <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full" />
                <div className={`absolute top-4 left-0 h-1 bg-gov-green rounded-full transition-all`} style={{ width: `${(STEPS.indexOf(result.status) / (STEPS.length - 1)) * 100}%` }} />
                <div className="relative grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
                  {STEPS.map((s, i) => {
                    const active = STEPS.indexOf(result.status) >= i;
                    return (
                      <div key={s} className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${active ? "bg-gov-green text-white" : "bg-gray-200 text-gray-500"}`}>
                          {active ? <IconCheck className="w-4 h-4" /> : i + 1}
                        </div>
                        <span className={`mt-2 text-[11px] font-semibold text-center ${active ? "text-gov-green" : "text-gray-400"}`}>{s}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{k}</div>
      <div className="font-semibold mt-1">{v}</div>
    </div>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input {...rest} className="mt-2 w-full bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-gov-green focus:outline-none" />
    </div>
  );
}

// ==================== LOGIN / REGISTER ====================
export function LoginPage() {
  const { login, adminLogin, navigate, lang } = useStore();
  const t = useT(lang);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const okUser = await login(id, pw);
    if (okUser) { navigate({ page: "home" }); return; }
    const okAdmin = await adminLogin(id, pw);
    if (okAdmin) { navigate({ page: "admin" }); return; }
    setErr(t("Invalid credentials. Try again.", "गलत पासवर्ड। पुनः प्रयास करें।"));
    setLoading(false);
  };

  return (
    <div>
      <PageTitle title={t("Login", "लॉगिन")} subtitle={t("Login to access your account, complaints and profile.", "अपने खाते, शिकायतें और प्रोफ़ाइल के लिए लॉगिन करें।")} />
      <div className="max-w-md mx-auto px-3 sm:px-6 pb-16">
        <form onSubmit={submit} className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-gray-200 space-y-4">
          {err && <div className="bg-red-50 text-red-700 border-l-4 border-red-500 p-3 rounded-xl text-sm">{err}</div>}
          <Field label={t("Email or Mobile", "ईमेल या मोबाइल")} value={id} onChange={e => setId(e.target.value)} required type="text" autoComplete="username" />
          <Field label={t("Password", "पासवर्ड")} value={pw} onChange={e => setPw(e.target.value)} required type="password" autoComplete="current-password" />
          <button type="submit" disabled={loading} className="w-full bg-gov-green text-white py-3.5 rounded-xl font-bold hover:bg-gov-green-2 transition disabled:opacity-70">
            {loading ? t("Verifying…", "जांच की जा रही है…") : t("Login", "लॉगिन")}
          </button>
          <div className="text-center text-sm text-gray-600">
            {t("Don't have an account?", "खाता नहीं है?")} <button type="button" onClick={() => navigate({ page: "register" })} className="text-gov-green font-bold hover:underline">{t("Register", "रजिस्टर करें")}</button>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center leading-relaxed">
            {t("Demo-only Admin:", "केवल डेमो एडमिन:")} admin@dumariya.local / demo-only
          </div>
        </form>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { register, navigate, lang } = useStore();
  const t = useT(lang);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", password: "", two: "", village: "Kolhubar" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (form.password !== form.two) { setErr(t("Passwords do not match.", "पासवर्ड मेल नहीं खाते।")); return; }
    if (form.password.length < 6) { setErr(t("Password must be at least 6 characters.", "पासवर्ड 6+ अक्षर होना चाहिए।")); return; }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) { setErr(t("Invalid mobile number.", "अमान्य मोबाइल नंबर।")); return; }
    const error = await register(form);
    if (error) setErr(error);
    else setOk(true);
  };

  return (
    <div>
      <PageTitle title={t("Create Account", "खाता बनाएं")} subtitle={t("Register to file complaints, track status and manage your profile.", "शिकायत दर्ज करने, स्थिति देखने और प्रोफ़ाइल प्रबंधित करने के लिए रजिस्टर करें।")} />
      <div className="max-w-lg mx-auto px-3 sm:px-6 pb-16">
        {ok ? (
          <div className="bg-green-50 border-l-4 border-green-600 rounded-2xl p-8 text-center">
            <div className="text-5xl">🎉</div>
            <h3 className="mt-4 font-bold text-xl text-green-900">{t("Account created successfully!", "खाता बनाया गया!")}</h3>
            <p className="mt-2 text-sm text-green-700">{t("You can now file and track complaints.", "अब आप शिकायत दर्ज कर सकते हैं।")}</p>
            <button onClick={() => navigate({ page: "complaint" })} className="mt-5 bg-gov-green text-white px-6 py-3 rounded-xl font-bold hover:bg-gov-green-2 transition">
              {t("Register a Complaint", "शिकायत दर्ज करें")}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-gray-200 space-y-4">
            {err && <div className="bg-red-50 text-red-700 border-l-4 border-red-500 p-3 rounded-xl text-sm">{err}</div>}
            <Field label={t("Full Name", "पूरा नाम")} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("Mobile", "मोबाइल")} value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} required type="tel" />
              <Field label={t("Email", "ईमेल")} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required type="email" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("Password", "पासवर्ड")} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required type="password" />
              <Field label={t("Confirm Password", "पासवर्ड दोबारा")} value={form.two} onChange={e => setForm(f => ({ ...f, two: e.target.value }))} required type="password" />
            </div>
            <Field label={t("Village", "गांव")} value={form.village} onChange={e => setForm(f => ({ ...f, village: e.target.value }))} required />
            <button type="submit" className="w-full bg-gov-green text-white py-3.5 rounded-xl font-bold hover:bg-gov-green-2 transition">
              {t("Create Account", "खाता बनाएं")}
            </button>
            <div className="text-center text-sm text-gray-600">
              {t("Already have an account?", "पहले से खाता है?")} <button type="button" onClick={() => navigate({ page: "login" })} className="text-gov-green font-bold hover:underline">{t("Login", "लॉगिन करें")}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function AccountPage() {
  const { user, complaints, updateProfile, lang, navigate } = useStore();
  const t = useT(lang);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", mobile: user?.mobile || "", village: user?.village || "" });
  if (!user) { navigate({ page: "login" }); return null; }

  const mine = complaints.filter(c => c.userId === user.id || c.mobile === user.mobile);

  return (
    <div>
      <PageTitle title={t("My Account", "मेरा खाता")} subtitle={t("Manage your profile and view your submitted complaints.", "अपनी प्रोफ़ाइल और शिकायतें देखें।")} />
      <div className="max-w-[900px] mx-auto px-3 sm:px-6 pb-16 space-y-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl p-6 ring-1 ring-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-xl">{t("Profile", "प्रोफ़ाइल")}</h2>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            </div>
            <button onClick={() => setEditing(!editing)} className="text-sm font-semibold text-gov-green hover:underline">{editing ? t("Cancel", "रद्द करें") : t("Edit", "सुधारें")}</button>
          </div>

          {editing ? (
            <form className="mt-4 grid sm:grid-cols-3 gap-4" onSubmit={e => { e.preventDefault(); updateProfile(form); setEditing(false); }}>
              <Field label={t("Name", "नाम")} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <Field label={t("Mobile", "मोबाइल")} value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} />
              <Field label={t("Village", "गांव")} value={form.village} onChange={e => setForm(f => ({ ...f, village: e.target.value }))} />
              <button className="bg-gov-green text-white px-5 py-2.5 rounded-xl font-semibold self-end">{t("Save", "सहेजें")}</button>
            </form>
          ) : (
            <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
              <Info k={t("Name", "नाम")} v={user.name} />
              <Info k={t("Mobile", "मोबाइल")} v={user.mobile} />
              <Info k={t("Village", "गांव")} v={user.village} />
            </div>
          )}
        </div>

        {/* My complaints */}
        <div className="bg-white rounded-2xl p-6 ring-1 ring-gray-200">
          <h2 className="font-bold text-xl mb-4">{t("My Complaints", "मेरी शिकायतें")} <span className="text-sm text-gray-500 font-normal">({mine.length})</span></h2>
          {mine.length === 0 ? (
            <p className="text-sm text-gray-500">{t("No complaints filed yet.", "अभी तक कोई शिकायत दर्ज नहीं हुई।")}</p>
          ) : (
            <div className="space-y-3">
              {mine.map(c => (
                <div key={c.id} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono font-semibold">{c.id}</div>
                    <div className="text-xs text-gray-500 mt-1">{c.category} · {new Date(c.createdAt).toLocaleDateString()}</div>
                  </div>
                  <span className={`status-badge status-${c.status.toLowerCase().replace(" ", "")}`}>{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
