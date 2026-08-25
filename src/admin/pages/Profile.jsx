import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Field = ({ label, field, placeholder, type = "text", options = null, form, handleChange, formatImageUrl }) => (
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{label}</label>
    {type === "textarea" ? (
      <textarea
        value={form[field] || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all resize-none"
      />
    ) : type === "select" && options ? (
      <select
        value={form[field] || options[0].value}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all appearance-none"
      >
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    ) : (
      <input
        type={type}
        value={form[field] || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
      />
    )}
    {/* Live Image Previews */}
    {field === "profileImageUrl" && form[field] && (
      <div className="mt-3">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Preview (Aligned to: {form.profileImagePosition || "center"}):</p>
        <img 
          src={formatImageUrl(form[field])} 
          alt="Profile Preview" 
          className="h-32 w-24 object-cover rounded-xl border border-slate-700" 
          style={{ objectPosition: form.profileImagePosition || "center" }}
          onError={(e) => e.target.style.display='none'} 
        />
      </div>
    )}
    {field === "faviconUrl" && form[field] && (
      <div className="mt-3 flex items-center gap-2">
         <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Browser Tab Preview:</p>
         <div className="flex items-center bg-slate-700 rounded-t-lg px-3 py-1.5 w-max">
           <img src={formatImageUrl(form[field])} alt="Favicon Preview" className="h-4 w-4 object-cover rounded-sm" onError={(e) => e.target.style.display='none'} />
           <span className="text-xs text-slate-300 ml-2">Yatish Kumar</span>
         </div>
      </div>
    )}
  </div>
);

export default function Profile() {
  const [form, setForm] = useState({
    name: "", title: "", bio: "", profileImageUrl: "", profileImagePosition: "center", faviconUrl: "",
    cgpa: "", githubUrl: "", linkedinUrl: "", instagramUrl: "", email: "", phone: "", resumeUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/profile", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.profile) setForm(d.profile);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const formatImageUrl = (url) => {
    if (!url) return "";
    const gdriveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (gdriveMatch) {
      return `/api/image-proxy?id=${gdriveMatch[1]}`;
    }
    return url;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      if (data.profile) setForm(data.profile);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-2xl">
        {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-white">Profile</h1>
        <p className="text-slate-400 text-sm mt-0.5">Edit your personal information and social links.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Basic Info</h2>
          <Field label="Name" field="name" placeholder="Yatish Kumar" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field label="Professional Title" field="title" placeholder="Full Stack Developer" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field label="Bio" field="bio" placeholder="A short description about yourself..." type="textarea" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field label="CGPA / Grade" field="cgpa" placeholder="e.g. 7.67" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field label="Profile Image URL" field="profileImageUrl" placeholder="/profile.jpg or https://..." form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field 
            label="Image Crop Focus (Object Position)" 
            field="profileImagePosition" 
            type="select" 
            options={[
              { value: "center", label: "Center (Default)" },
              { value: "top", label: "Top (Head/Face)" },
              { value: "bottom", label: "Bottom" },
              { value: "left", label: "Left" },
              { value: "right", label: "Right" }
            ]} 
            form={form} handleChange={handleChange} formatImageUrl={formatImageUrl}
          />
          <Field label="Favicon (Browser Tab) URL" field="faviconUrl" placeholder="/vite.svg or https://..." form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field label="Resume URL" field="resumeUrl" placeholder="/resume.pdf" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contact & Social</h2>
          <Field label="Email (shown on site)" field="email" placeholder="yatish0155@gmail.com" type="email" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field label="Phone" field="phone" placeholder="+91-98XXXXXXXX" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field label="GitHub URL" field="githubUrl" placeholder="https://github.com/yatishydv" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field label="LinkedIn URL" field="linkedinUrl" placeholder="https://linkedin.com/in/yatishydv" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
          <Field label="Instagram URL" field="instagramUrl" placeholder="https://instagram.com/yatishydv" form={form} handleChange={handleChange} formatImageUrl={formatImageUrl} />
        </div>

        {error && <p className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">{error}</p>}
        {success && <p className="text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">✓ Profile updated successfully</p>}

        <motion.button
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={saving}
          className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-500/20 disabled:shadow-none"
        >
          {saving ? "Saving..." : "Save Profile"}
        </motion.button>
      </form>
    </div>
  );
}
