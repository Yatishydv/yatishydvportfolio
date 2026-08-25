import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiSearch,
  FiX, FiExternalLink, FiGithub, FiAlertTriangle
} from "react-icons/fi";

const TECH_OPTIONS = [
  "React", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind",
  "TypeScript", "JavaScript", "PHP", "MySQL", "Laravel", "Python",
  "HTML", "CSS", "Java", "C++", "AI/ML"
];

const formatImageUrl = (url) => {
  if (!url) return '';
  const gdriveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (gdriveMatch) {
    return `/api/image-proxy?id=${gdriveMatch[1]}`;
  }
  return url;
};

const CATEGORIES = ["React", "Node.js", "PHP", "WebRTC", "AI", "Python", "Other"];
const STATUSES = ["PRODUCTION", "STABLE", "LIVE", "LEGACY", "DRAFT", "BETA", "ALPHA"];

const emptyProject = {
  title: "", shortDescription: "", fullDescription: "", imageUrl: "",
  liveUrl: "", githubUrl: "", tech: [], category: "React",
  date: "", featured: false, displayOrder: 0, published: false,
  status: "DRAFT", version: "",
};

function ProjectModal({ project, onClose, onSave }) {
  const [form, setForm] = useState(project || emptyProject);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!project?._id;

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleTech = (t) => {
    setForm((f) => ({
      ...f,
      tech: f.tech.includes(t) ? f.tech.filter((x) => x !== t) : [...f.tech, t],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required"); return; }
    setLoading(true);
    setError("");
    try {
      const url = isEdit ? `/api/projects/${project._id}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      onSave(data.project);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-lg font-black text-white">{isEdit ? "Edit Project" : "Add Project"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <FiX size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Title *</label>
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Project title"
              required
              className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Short Description</label>
            <textarea
              value={form.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              placeholder="Shown on the project card"
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Image URL</label>
            <input
              value={form.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              placeholder="/project-image.png or https://..."
              className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all font-mono"
            />
            {form.imageUrl && (
              <img src={formatImageUrl(form.imageUrl)} alt="preview" className="mt-2 h-20 w-auto rounded-lg border border-slate-700 object-cover" onError={(e) => e.target.style.display='none'} />
            )}
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Live URL</label>
              <input
                value={form.liveUrl}
                onChange={(e) => handleChange("liveUrl", e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">GitHub URL</label>
              <input
                value={form.githubUrl}
                onChange={(e) => handleChange("githubUrl", e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Technologies</label>
            <div className="flex flex-wrap gap-2">
              {TECH_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTech(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                    form.tech.includes(t)
                      ? "bg-rose-500 border-rose-500 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Category / Status / Date / Version */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status Badge</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Date / Version</label>
              <input
                value={form.version}
                onChange={(e) => handleChange("version", e.target.value)}
                placeholder="e.g. Jan 2026 or v1.0"
                className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Display Order</label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => handleChange("displayOrder", parseInt(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => handleChange("published", e.target.checked)}
                className="w-4 h-4 rounded accent-rose-500"
              />
              <span className="text-sm font-semibold text-slate-300">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                className="w-4 h-4 rounded accent-rose-500"
              />
              <span className="text-sm font-semibold text-slate-300">Featured</span>
            </label>
          </div>

          {error && (
            <p className="text-rose-400 text-xs font-medium bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-bold hover:border-slate-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-black uppercase tracking-widest transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function DeleteConfirm({ project, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-400">
          <FiAlertTriangle size={24} />
        </div>
        <h3 className="text-lg font-black text-white">Delete Project?</h3>
        <p className="text-slate-400 text-sm">
          <strong className="text-white">{project.title}</strong> will be permanently deleted.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-bold">Cancel</button>
          <button
            onClick={async () => {
              setLoading(true);
              await onConfirm();
              setLoading(false);
            }}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-black disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | 'new' | project object
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects", { credentials: "include" });
      const data = await res.json();
      setProjects(data.projects || []);
    } catch { setError("Failed to load projects"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSave = (saved) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p._id === saved._id);
      if (idx >= 0) { const next = [...prev]; next[idx] = saved; return next; }
      return [saved, ...prev];
    });
    setModal(null);
  };

  const handleTogglePublish = async (project) => {
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...project, published: !project.published }),
      });
      const data = await res.json();
      if (data.project) handleSave(data.project);
    } catch {}
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/projects/${deleteTarget._id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete project");
      setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message);
      setDeleteTarget(null);
    }
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-0.5">{projects.length} total</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setModal("new")}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-rose-500/20"
        >
          <FiPlus size={16} /> Add Project
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-rose-500/50 transition-all"
        />
      </div>

      {error && <p className="text-rose-400 text-sm">{error}</p>}

      {/* Projects List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <FiFolder size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-bold">{search ? "No projects match your search" : "No projects yet"}</p>
          {!search && <p className="text-sm mt-1">Click "Add Project" to create your first one</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((project) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-700 transition-all group"
            >
              {/* Thumbnail */}
              <div className="w-16 h-12 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-700">
                {project.imageUrl ? (
                  <img src={formatImageUrl(project.imageUrl)} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <FiFolder size={20} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-white truncate">{project.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    project.published ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-500"
                  }`}>
                    {project.published ? "Published" : "Draft"}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-400">Featured</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{project.shortDescription || project.liveUrl || "No description"}</p>
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {(project.tech || []).slice(0, 4).map((t) => (
                    <span key={t} className="text-[9px] font-bold bg-slate-800 px-2 py-0.5 rounded-md text-slate-400 uppercase">{t}</span>
                  ))}
                  {(project.tech || []).length > 4 && (
                    <span className="text-[9px] font-bold text-slate-600">+{project.tech.length - 4} more</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
                    <FiExternalLink size={15} />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
                    <FiGithub size={15} />
                  </a>
                )}
                <button
                  onClick={() => handleTogglePublish(project)}
                  className={`p-2 rounded-lg transition-all ${
                    project.published ? "text-emerald-400 hover:bg-emerald-500/10" : "text-slate-500 hover:text-white hover:bg-slate-800"
                  }`}
                  title={project.published ? "Unpublish" : "Publish"}
                >
                  {project.published ? <FiEye size={15} /> : <FiEyeOff size={15} />}
                </button>
                <button
                  onClick={() => setModal(project)}
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
                >
                  <FiEdit2 size={15} />
                </button>
                <button
                  onClick={() => setDeleteTarget(project)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {modal && (
          <ProjectModal
            project={modal === "new" ? null : modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}
        {deleteTarget && (
          <DeleteConfirm
            project={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
