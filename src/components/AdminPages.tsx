import { useState } from "react";
import { useStore } from "../store";
import { PageTitle } from "./Shell";
import type { Complaint } from "../data/village";
import { IconPlus, IconTrash, IconSearch } from "./Icons";

const STATUSES: Complaint["status"][] = ["Submitted", "Under Review", "In Progress", "Resolved"];

export function AdminPage() {
  const { user, users, complaints, notices, schemes, updateComplaintStatus, deleteComplaint, deleteUser } = useStore();
  const [tab, setTab] = useState("dashboard");

  if (!user || user.id !== "admin") {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gov-red">Access Denied</h2>
        <p className="mt-2 text-gray-600">You must be logged in as admin.</p>
      </div>
    );
  }

  const stats = {
    users: users.length,
    complaints: complaints.length,
    pending: complaints.filter(c => c.status === "Submitted").length,
    review: complaints.filter(c => c.status === "Under Review").length,
    progress: complaints.filter(c => c.status === "In Progress").length,
    resolved: complaints.filter(c => c.status === "Resolved").length,
    notices: notices.length,
    schemes: schemes.length,
  };

  return (
    <div>
      <PageTitle title="Admin Dashboard" subtitle="Prakhand administration for Dumaria block portal." badge="Admin Only" />
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-16">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {["dashboard", "complaints", "users", "notices", "schemes"].map(k => (
            <button key={k} onClick={() => setTab(k)} className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-semibold text-sm capitalize transition ${tab === k ? "bg-gov-blue text-white" : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"}`}>
              {k}
            </button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { label: "Total Villagers", val: stats.users, c: "bg-gov-blue/5 text-gov-blue" },
              { label: "Total Complaints", val: stats.complaints, c: "bg-gov-blue/5 text-gov-blue" },
              { label: "Pending", val: stats.pending, c: "bg-amber-100 text-amber-700" },
              { label: "In Progress", val: stats.progress, c: "bg-blue-100 text-blue-700" },
              { label: "Resolved", val: stats.resolved, c: "bg-green-100 text-green-700" },
              { label: "Notices", val: stats.notices, c: "bg-gov-blue/5 text-gov-blue" },
              { label: "Active Schemes", val: stats.schemes, c: "bg-gov-green/5 text-gov-green" },
            ].map(s => (
              <div key={s.label} className={`rounded-2xl p-5 ${s.c}`}>
                <div className="text-3xl font-bold">{s.val}</div>
                <div className="text-xs font-semibold mt-1 opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "complaints" && <ComplaintsTable complaints={complaints} updateStatus={updateComplaintStatus} deleteComp={deleteComplaint} />}
        {tab === "users" && <UsersTable users={users} deleteUser={deleteUser} />}
        {tab === "notices" && <NoticeAdmin />}
        {tab === "schemes" && <SchemeAdmin />}
      </div>
    </div>
  );
}

function ComplaintsTable({ complaints, updateStatus, deleteComp }: any) {
  const [q, setQ] = useState("");
  const filtered = complaints.filter((c: Complaint) =>
    c.id.toLowerCase().includes(q.toLowerCase()) || c.name.toLowerCase().includes(q.toLowerCase()) || c.category.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2 bg-gray-50 rounded-t-2xl">
        <IconSearch className="w-4 h-4 text-gray-500" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search complaints..." className="flex-1 bg-transparent outline-none text-sm" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3 font-bold">ID</th>
              <th className="text-left p-3 font-bold">Name</th>
              <th className="text-left p-3 font-bold">Category</th>
              <th className="text-left p-3 font-bold">Location</th>
              <th className="text-left p-3 font-bold">Status</th>
              <th className="text-left p-3 font-bold">Date</th>
              <th className="text-left p-3 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c: Complaint) => (
              <tr key={c.id} className="border-t border-gray-100">
                <td className="p-3 font-mono font-semibold">{c.id}</td>
                <td className="p-3">{c.name}<br /><span className="text-xs text-gray-500">{c.mobile}</span></td>
                <td className="p-3">{c.category}</td>
                <td className="p-3 max-w-[160px] truncate">{c.location}</td>
                <td className="p-3">
                  <select value={c.status} onChange={e => updateStatus(c.id, e.target.value as Complaint["status"])} className="bg-gray-50 rounded-lg px-2 py-1.5 text-sm font-semibold focus:outline-none">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-3 text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString("en-IN")}</td>
                <td className="p-3">
                  <button onClick={() => deleteComp(c.id)} className="text-red-600 hover:text-red-800" aria-label="Delete"><IconTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-8 text-center text-gray-500">No complaints found.</div>}
      </div>
    </div>
  );
}

function UsersTable({ users, deleteUser }: any) {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3 font-bold">Name</th>
              <th className="text-left p-3 font-bold">Mobile</th>
              <th className="text-left p-3 font-bold">Email</th>
              <th className="text-left p-3 font-bold">Village</th>
              <th className="text-left p-3 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u.id} className="border-t border-gray-100">
                <td className="p-3 font-semibold">{u.name}</td>
                <td className="p-3">{u.mobile}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.village}</td>
                <td className="p-3"><button onClick={() => deleteUser(u.id)} className="text-red-600 hover:text-red-800" aria-label="Delete"><IconTrash /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <div className="p-8 text-center text-gray-500">No registered villagers yet.</div>}
      </div>
    </div>
  );
}

function NoticeAdmin() {
  const { notices, addNotice, deleteNotice } = useStore() as any;
  const [form, setForm] = useState({ title: "", description: "", category: "Announcement", date: new Date().toISOString().slice(0, 10) });
  return (
    <div className="space-y-6">
      <form onSubmit={e => { e.preventDefault(); addNotice(form); setForm({ title: "", description: "", category: "Announcement", date: new Date().toISOString().slice(0, 10) }); }} className="bg-white rounded-2xl p-6 ring-1 ring-gray-200 grid sm:grid-cols-2 gap-4">
        <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Notice title" className="bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200">
          {["Announcement", "Meeting", "Health", "Infrastructure", "Other"].map(c => <option key={c}>{c}</option>)}
        </select>
        <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" rows={2} className="sm:col-span-2 bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <button className="bg-gov-green text-white rounded-xl font-bold flex items-center justify-center gap-2"><IconPlus /> Add Notice</button>
      </form>

      <div className="space-y-3">
        {notices.map((n: any) => (
          <div key={n.id} className="bg-white rounded-xl p-4 ring-1 ring-gray-200 flex justify-between items-start">
            <div>
              <div className="font-semibold">{n.title}</div>
              <div className="text-xs text-gray-500 mt-1">{n.category} · {n.date}</div>
              <p className="text-sm text-gray-600 mt-2">{n.description}</p>
            </div>
            <button onClick={() => deleteNotice(n.id)} className="text-red-600 hover:text-red-800" aria-label="Delete"><IconTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchemeAdmin() {
  const { schemes, addScheme, deleteScheme } = useStore() as any;
  const [form, setForm] = useState({ name: "", category: "", description: "", eligibility: "", benefits: "", documents: "", howToApply: "" });
  return (
    <div className="space-y-6">
      <form onSubmit={e => { e.preventDefault(); addScheme(form); setForm({ name: "", category: "", description: "", eligibility: "", benefits: "", documents: "", howToApply: "" }); }} className="bg-white rounded-2xl p-6 ring-1 ring-gray-200 grid sm:grid-cols-2 gap-4">
        <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Scheme name" className="bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <input required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Category" className="bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" rows={2} className="sm:col-span-2 bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <input required value={form.eligibility} onChange={e => setForm(f => ({ ...f, eligibility: e.target.value }))} placeholder="Eligibility" className="bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <input required value={form.benefits} onChange={e => setForm(f => ({ ...f, benefits: e.target.value }))} placeholder="Benefits" className="bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <input required value={form.documents} onChange={e => setForm(f => ({ ...f, documents: e.target.value }))} placeholder="Required documents" className="bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <input required value={form.howToApply} onChange={e => setForm(f => ({ ...f, howToApply: e.target.value }))} placeholder="How to apply" className="bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200" />
        <button className="bg-gov-green text-white rounded-xl font-bold flex items-center justify-center gap-2"><IconPlus /> Add Scheme</button>
      </form>

      <div className="grid sm:grid-cols-2 gap-4">
        {schemes.map((s: any) => (
          <div key={s.id} className="bg-white rounded-xl p-4 ring-1 ring-gray-200 flex justify-between items-start">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-xs text-gray-500 mt-1">{s.category}</div>
              <p className="text-sm text-gray-600 mt-2">{s.description}</p>
            </div>
            <button onClick={() => deleteScheme(s.id)} className="text-red-600 hover:text-red-800" aria-label="Delete"><IconTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
