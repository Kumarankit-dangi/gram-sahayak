import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Complaint, Notice, Scheme, EmergencyContact } from "./data/village";
import { DEFAULT_SCHEMES, DEFAULT_NOTICES, DEFAULT_EMERGENCY } from "./data/village";

// ---- Hashing (SHA-256 via browser crypto) ----
async function hash(text: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const arr = Array.from(new Uint8Array(digest));
  return arr.map(b => b.toString(16).padStart(2, "0")).join("");
}

export type User = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  passwordHash: string;
  village: string;
};

const ADMIN: User = {
  id: "admin",
  name: "Panchayat Admin",
  mobile: "",
  email: "admin@dumariya.local",
  passwordHash: "", // set on first admin login with known password
  village: "Dumaria",
};

type StoreCtx = {
  user: User | null;
  users: User[];
  complaints: Complaint[];
  notices: Notice[];
  schemes: Scheme[];
  emergency: EmergencyContact[];
  lang: "en" | "hi";
  route: Route;
  register: (u: Omit<User, "id" | "passwordHash"> & { password: string }) => Promise<string | null>;
  login: (identifier: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addComplaint: (c: Omit<Complaint, "id" | "createdAt" | "updatedAt" | "status">) => Complaint;
  updateComplaintStatus: (id: string, status: Complaint["status"]) => void;
  getComplaint: (id: string) => Complaint | undefined;
  addNotice: (n: Omit<Notice, "id">) => void;
  deleteNotice: (id: string) => void;
  addScheme: (s: Omit<Scheme, "id">) => void;
  deleteScheme: (id: string) => void;
  deleteComplaint: (id: string) => void;
  deleteUser: (id: string) => void;
  updateProfile: (u: Partial<User>) => void;
  setLang: (l: "en" | "hi") => void;
  navigate: (r: Route) => void;
};

export type Route =
  | { page: "home" }
  | { page: "village" }
  | { page: "services" }
  | { page: "schemes" }
  | { page: "complaint" }
  | { page: "track" }
  | { page: "notices" }
  | { page: "emergency" }
  | { page: "land" }
  | { page: "login" }
  | { page: "register" }
  | { page: "account" }
  | { page: "admin" };

const Ctx = createContext<StoreCtx | null>(null);

const LSKEYS = {
  users: "gs_users",
  complaints: "gs_complaints",
  notices: "gs_notices",
  schemes: "gs_schemes",
  emergency: "gs_emergency",
  currentUser: "gs_currentUser",
  lang: "gs_lang",
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save<T>(key: string, val: T) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load(LSKEYS.currentUser, null));
  const [users, setUsers] = useState<User[]>(() => load(LSKEYS.users, []));
  const [complaints, setComplaints] = useState<Complaint[]>(() => load(LSKEYS.complaints, []));
  const [notices, setNotices] = useState<Notice[]>(() => load(LSKEYS.notices, DEFAULT_NOTICES));
  const [schemes, setSchemes] = useState<Scheme[]>(() => load(LSKEYS.schemes, DEFAULT_SCHEMES));
  const [emergency] = useState<EmergencyContact[]>(() => load(LSKEYS.emergency, DEFAULT_EMERGENCY));
  const [lang, setLangState] = useState<"en" | "hi">(() => load(LSKEYS.lang, "en"));
  const [route, setRoute] = useState<Route>({ page: "home" });

  useEffect(() => save(LSKEYS.users, users), [users]);
  useEffect(() => save(LSKEYS.complaints, complaints), [complaints]);
  useEffect(() => save(LSKEYS.notices, notices), [notices]);
  useEffect(() => save(LSKEYS.schemes, schemes), [schemes]);
  useEffect(() => save(LSKEYS.emergency, emergency), [emergency]);
  useEffect(() => save(LSKEYS.currentUser, user), [user]);
  useEffect(() => save(LSKEYS.lang, lang), [lang]);

  const value = useMemo<StoreCtx>(() => {
    return {
      user, users, complaints, notices, schemes, emergency, lang, route,

      async register(data) {
        const { password, ...rest } = data;
        const exists = users.find(u => u.email.toLowerCase() === data.email.toLowerCase() || u.mobile === data.mobile);
        if (exists) return "Account already exists with this email or mobile.";
        const passwordHash = await hash(password);
        const id = "u-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
        const u: User = { ...rest, id, passwordHash };
        setUsers(prev => [...prev, u]);
        setUser(u);
        return null;
      },

      async login(identifier, password) {
        const h = await hash(password);
        const u = users.find(x => (x.email.toLowerCase() === identifier.toLowerCase() || x.mobile === identifier) && x.passwordHash === h);
        if (!u) return false;
        setUser(u);
        return true;
      },

      async adminLogin(email, password) {
        // Demo-only credentials; this client-side check is not production authentication.
        const h = await hash(password);
        const known = await hash("demo-only");
        if (email === "admin@dumariya.local" && h === known) {
          const adminUser = { ...ADMIN, email };
          setUser(adminUser);
          return true;
        }
        return false;
      },

      logout() { setUser(null); },

      addComplaint(c) {
        const id = "CMP-" + Date.now().toString().slice(-8) + "-" + Math.floor(Math.random() * 1000);
        const comp: Complaint = {
          ...c,
          id,
          status: "Submitted",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        setComplaints(prev => [comp, ...prev]);
        return comp;
      },

      updateComplaintStatus(id, status) {
        setComplaints(prev =>
          prev.map(c => (c.id === id ? { ...c, status, updatedAt: Date.now() } : c))
        );
      },

      getComplaint(id) { return complaints.find(c => c.id === id); },

      addNotice(n) {
        const id = "nt-" + Date.now();
        setNotices(prev => [{ ...n, id }, ...prev]);
      },
      deleteNotice(id) { setNotices(prev => prev.filter(n => n.id !== id)); },

      addScheme(s) {
        const id = "sch-" + Date.now();
        setSchemes(prev => [{ ...s, id }, ...prev]);
      },
      deleteScheme(id) { setSchemes(prev => prev.filter(s => s.id !== id)); },

      deleteComplaint(id) { setComplaints(prev => prev.filter(c => c.id !== id)); },
      deleteUser(id) { setUsers(prev => prev.filter(u => u.id !== id)); },

      updateProfile(patch) {
        if (!user) return;
        const u = { ...user, ...patch };
        setUser(u);
        setUsers(prev => prev.map(x => (x.id === u.id ? u : x)));
      },

      setLang(l) { setLangState(l); },
      navigate(r) {
        setRoute(r);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    };
  }, [user, users, complaints, notices, schemes, emergency, lang, route]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used inside StoreProvider");
  return c;
};
