import { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid, FiFolder, FiAward, FiCode, FiUser, FiLogOut,
  FiMenu, FiX, FiExternalLink
} from "react-icons/fi";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Skills from "./pages/Skills";
import Profile from "./pages/Profile";

const navItems = [
  { to: "/admin/dashboard", icon: <FiGrid size={18} />, label: "Dashboard" },
  { to: "/admin/projects", icon: <FiFolder size={18} />, label: "Projects" },
  { to: "/admin/certificates", icon: <FiAward size={18} />, label: "Certificates" },
  { to: "/admin/skills", icon: <FiCode size={18} />, label: "Skills" },
  { to: "/admin/profile", icon: <FiUser size={18} />, label: "Profile" },
];

function Sidebar({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    navigate("/admin", { replace: true });
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-rose-500 uppercase tracking-[0.2em] mb-0.5">Admin CMS</p>
            <h2 className="text-white font-black text-lg tracking-tight">
              Yatish<span className="text-rose-500">Kumar</span>
            </h2>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors lg:hidden">
              <FiX size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
        >
          <FiExternalLink size={16} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data?.profile?.faviconUrl) {
          let link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          let url = data.profile.faviconUrl;
          const gdriveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
          if (gdriveMatch) url = `/api/image-proxy?id=${gdriveMatch[1]}`;
          link.href = url;
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex text-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 flex lg:hidden"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-400 hover:text-white transition-colors">
            <FiMenu size={22} />
          </button>
          <h1 className="text-sm font-black text-white">
            Yatish<span className="text-rose-500">Kumar</span> CMS
          </h1>
          <div className="w-8" />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="skills" element={<Skills />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
