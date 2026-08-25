import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCode, FiAlertTriangle } from "react-icons/fi";

const CATEGORIES = [
  "Programming Languages",
  "Frontend Engineering",
  "Backend & Systems",
  "Soft Skills & Focus",
  "DevOps & Tools",
  "AI & Data Science",
];

const ICON_NAMES = [
  "FaJs", "FaReact", "FaNodeJs", "FaPhp", "FaPython", "FaJava", "FaCode",
  "FaHtml5", "FaCss3Alt", "FaGitAlt", "FaDatabase", "FaCloud", "FaGear",
  "FaUsers", "FaBrain", "FaLightbulb", "SiTailwindcss", "SiFirebase",
  "SiMongodb", "SiLaravel", "SiTypescript",
];

const emptySkill = { name: "", category: "Programming Languages", color: "#f43f5e", iconName: "FaCode", displayOrder: 0, published: true };

function SkillModal({ skill, onClose, onSave }) {
  const [form, setForm] = useState(skill || emptySkill);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!skill?._id;

  const handleChange = (f, v) => setForm((prev) => ({ ...prev, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category) { setError("Name and category required"); return; }
    setLoading(true);
    setError("");
    try {
      const url = isEdit ? `/api/skills/${skill._id}` : "/api/skills";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        credentials: "include", body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      onSave(data.skill);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-lg font-black text-white">{isEdit ? "Edit Skill" : "Add Skill"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><FiX size={22} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Skill Name *</label>
            <input value={form.name} onChange={(e) => handleChange("name", e.target.value)} required
              placeholder="e.g. React.js"
              className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category *</label>
            <select value={form.category} onChange={(e) => handleChange("category", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={form.color} onChange={(e) => handleChange("color", e.target.value)}
                  className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-800 cursor-pointer" />
                <input value={form.color} onChange={(e) => handleChange("color", e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-3 py-2.5 text-white text-xs outline-none font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Display Order</label>
              <input type="number" value={form.displayOrder} onChange={(e) => handleChange("displayOrder", parseInt(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Icon Name</label>
            <select value={form.iconName} onChange={(e) => handleChange("iconName", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none font-mono">
              {ICON_NAMES.map((ic) => <option key={ic}>{ic}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => handleChange("published", e.target.checked)} className="w-4 h-4 rounded accent-rose-500" />
            <span className="text-sm font-semibold text-slate-300">Published</span>
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

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchSkills = async () => {
    setLoading(true);
    const res = await fetch("/api/skills?all=1", { credentials: "include" });
    const data = await res.json();
    setSkills(data.skills || []);
    setLoading(false);
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleSave = (saved) => {
    setSkills((prev) => {
      const idx = prev.findIndex((s) => s._id === saved._id);
      if (idx >= 0) { const n = [...prev]; n[idx] = saved; return n; }
      return [saved, ...prev];
    });
    setModal(null);
  };

  const handleDelete = async () => {
    await fetch(`/api/skills/${deleteTarget._id}`, { method: "DELETE", credentials: "include" });
    setSkills((prev) => prev.filter((s) => s._id !== deleteTarget._id));
    setDeleteTarget(null);
  };

  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Skills</h1>
          <p className="text-slate-400 text-sm mt-0.5">{skills.length} total skills</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setModal("new")}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-rose-500/20">
          <FiPlus size={16} /> Add Skill
        </motion.button>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />)}</div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <FiCode size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-bold">No skills yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, catSkills]) => (
            <div key={category} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{category}</h2>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <motion.div key={skill._id} layout
                    className={`group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                      skill.published ? "bg-slate-800 border-slate-700" : "bg-slate-800/50 border-slate-800 opacity-50"
                    }`}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: skill.color }} />
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                    <div className="hidden group-hover:flex items-center gap-1 ml-1">
                      <button onClick={() => setModal(skill)} className="text-slate-500 hover:text-white transition-colors"><FiEdit2 size={12} /></button>
                      <button onClick={() => setDeleteTarget(skill)} className="text-slate-500 hover:text-rose-400 transition-colors"><FiTrash2 size={12} /></button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && <SkillModal skill={modal === "new" ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTarget(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-400"><FiAlertTriangle size={24} /></div>
              <h3 className="text-lg font-black text-white">Delete "{deleteTarget.name}"?</h3>
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
