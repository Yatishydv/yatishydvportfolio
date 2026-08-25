import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiSearch, FiX, FiAward, FiAlertTriangle } from "react-icons/fi";

const COLOR_PRESETS = [
  { label: "Oracle Red", color: "#f80000", from: "from-red-500", to: "to-orange-500", bg: "bg-red-50/30" },
  { label: "Blue", color: "#0056D2", from: "from-blue-600", to: "to-cyan-500", bg: "bg-indigo-50/30" },
  { label: "Google Blue", color: "#4285f4", from: "from-blue-500", to: "to-emerald-500", bg: "bg-blue-50/30" },
  { label: "Purple", color: "#777BB4", from: "from-purple-500", to: "to-fuchsia-500", bg: "bg-purple-50/30" },
  { label: "Emerald", color: "#10B981", from: "from-emerald-500", to: "to-teal-500", bg: "bg-emerald-50/30" },
  { label: "Rose", color: "#f43f5e", from: "from-rose-500", to: "to-pink-500", bg: "bg-rose-50/30" },
  { label: "Amber", color: "#F59E0B", from: "from-amber-500", to: "to-yellow-500", bg: "bg-amber-50/30" },
];

const emptyCert = {
  name: "", issuer: "", description: "", date: "", credentialId: "",
  credentialUrl: "", imageUrl: "", pdfUrl: "", skills: [],
  displayOrder: 0, published: false, color: "#f43f5e",
  gradientFrom: "from-rose-500", gradientTo: "to-pink-500",
  bgClass: "bg-rose-50/30", span: "col-span-1", iconName: "FaAward",
};

function CertModal({ cert, onClose, onSave }) {
  const [form, setForm] = useState(cert || emptyCert);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const isEdit = !!cert?._id;

  const handleChange = (f, v) => setForm((prev) => ({ ...prev, [f]: v }));

  const applyPreset = (preset) => {
    setForm((f) => ({ ...f, color: preset.color, gradientFrom: preset.from, gradientTo: preset.to, bgClass: preset.bg }));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm((f) => ({ ...f, skills: [...f.skills, skillInput.trim()] }));
    }
    setSkillInput("");
  };

  const removeSkill = (s) => setForm((f) => ({ ...f, skills: f.skills.filter((x) => x !== s) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Name is required"); return; }
    setLoading(true);
    setError("");
    try {
      const url = isEdit ? `/api/certificates/${cert._id}` : "/api/certificates";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        credentials: "include", body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      onSave(data.certificate);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 overflow-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-lg font-black text-white">{isEdit ? "Edit Certificate" : "Add Certificate"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><FiX size={22} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Certificate Name *</label>
            <input value={form.name} onChange={(e) => handleChange("name", e.target.value)} required
              placeholder="e.g. Oracle Certified Associate"
              className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Issuing Organization</label>
              <input value={form.issuer} onChange={(e) => handleChange("issuer", e.target.value)}
                placeholder="Oracle, Coursera, Udemy..."
                className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Issue Date</label>
              <input value={form.date} onChange={(e) => handleChange("date", e.target.value)}
                placeholder="e.g. Mar 2026"
                className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Certificate Image URL</label>
            <input value={form.imageUrl} onChange={(e) => handleChange("imageUrl", e.target.value)}
              placeholder="/1.png or https://..."
              className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none font-mono" />
            {form.imageUrl && (
              <img src={form.imageUrl} alt="preview" className="mt-2 h-16 w-auto rounded-lg border border-slate-700 object-cover" onError={(e) => e.target.style.display='none'} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Credential ID</label>
              <input value={form.credentialId} onChange={(e) => handleChange("credentialId", e.target.value)}
                placeholder="ORCL-FND-2025"
                className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Display Order</label>
              <input type="number" value={form.displayOrder}
                onChange={(e) => handleChange("displayOrder", parseInt(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none" />
            </div>
          </div>

          {/* Color Preset */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Card Theme Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_PRESETS.map((p) => (
                <button key={p.label} type="button" onClick={() => applyPreset(p)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${form.color === p.color ? "border-white scale-110" : "border-transparent opacity-70"}`}
                  style={{ backgroundColor: p.color }} title={p.label} />
              ))}
            </div>
          </div>

          {/* Span */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Card Width</label>
            <select value={form.span} onChange={(e) => handleChange("span", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none">
              <option value="col-span-1">Normal (1 column)</option>
              <option value="md:col-span-2">Wide (2 columns)</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Skills / Topics</label>
            <form onSubmit={addSkill} className="flex gap-2 mb-2">
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill..."
                className="flex-1 bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2 text-white text-sm outline-none" />
              <button type="submit" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-bold transition-all">Add</button>
            </form>
            <div className="flex flex-wrap gap-2">
              {form.skills.map((s) => (
                <span key={s} className="flex items-center gap-1 px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-300 font-medium">
                  {s}
                  <button type="button" onClick={() => removeSkill(s)} className="text-slate-500 hover:text-rose-400 ml-1"><FiX size={10} /></button>
                </span>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => handleChange("published", e.target.checked)} className="w-4 h-4 rounded accent-rose-500" />
            <span className="text-sm font-semibold text-slate-300">Published (visible on site)</span>
          </label>

          {error && <p className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-bold">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-black uppercase tracking-widest disabled:opacity-50">
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchCerts = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/certificates", { credentials: "include" });
    const data = await res.json();
    setCerts(data.certificates || []);
    setLoading(false);
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleSave = (saved) => {
    setCerts((prev) => {
      const idx = prev.findIndex((c) => c._id === saved._id);
      if (idx >= 0) { const n = [...prev]; n[idx] = saved; return n; }
      return [saved, ...prev];
    });
    setModal(null);
  };

  const handleToggle = async (cert) => {
    const res = await fetch(`/api/certificates/${cert._id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      credentials: "include", body: JSON.stringify({ ...cert, published: !cert.published }),
    });
    const data = await res.json();
    if (data.certificate) handleSave(data.certificate);
  };

  const handleDelete = async () => {
    await fetch(`/api/certificates/${deleteTarget._id}`, { method: "DELETE", credentials: "include" });
    setCerts((prev) => prev.filter((c) => c._id !== deleteTarget._id));
    setDeleteTarget(null);
  };

  const filtered = certs.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.issuer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Certificates</h1>
          <p className="text-slate-400 text-sm mt-0.5">{certs.length} total</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setModal("new")}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-rose-500/20">
          <FiPlus size={16} /> Add Certificate
        </motion.button>
      </div>

      <div className="relative">
        <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search certificates..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-rose-500/50" />
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <FiAward size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-bold">{search ? "No matches" : "No certificates yet"}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((cert) => (
            <motion.div key={cert._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${cert.color}22`, color: cert.color }}>
                <FiAward size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate">{cert.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest flex-shrink-0 ${cert.published ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-500"}`}>
                    {cert.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{cert.issuer} · {cert.date}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleToggle(cert)}
                  className={`p-2 rounded-lg transition-all ${cert.published ? "text-emerald-400" : "text-slate-500 hover:text-white hover:bg-slate-800"}`}>
                  {cert.published ? <FiEye size={15} /> : <FiEyeOff size={15} />}
                </button>
                <button onClick={() => setModal(cert)} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all"><FiEdit2 size={15} /></button>
                <button onClick={() => setDeleteTarget(cert)} className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"><FiTrash2 size={15} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && <CertModal cert={modal === "new" ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTarget(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-400"><FiAlertTriangle size={24} /></div>
              <h3 className="text-lg font-black text-white">Delete Certificate?</h3>
              <p className="text-slate-400 text-sm"><strong className="text-white">{deleteTarget.name}</strong> will be permanently deleted.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-bold">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-black">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
