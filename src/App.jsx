import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
import ResumeModal from "./components/ResumeModal";
import HiddenSEO from "./components/HiddenSEO";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import NotFound from "./components/NotFound";
import { trackEvent } from "./utils/analytics";

function Portfolio() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always start from top on refresh
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Track Page View
    trackEvent("page_view");

    // Fetch profile data
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data?.profile) {
          setProfile(data.profile);
          
          if (data.profile.faviconUrl) {
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
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <div className="bg-white text-slate-900 min-h-screen overflow-x-hidden transition-colors duration-500 selection:bg-rose-500/30">

      <ScrollProgress />
      <Navbar openResume={() => setIsResumeOpen(true)} profile={profile} />
      <main>
        <Hero openResume={() => setIsResumeOpen(true)} profile={profile} />
        <About openResume={() => setIsResumeOpen(true)} profile={profile} />
        <Education profile={profile} />
        <Skills />
        <Projects />
        <Certifications />
        <Contact profile={profile} />
      </main>
      <HiddenSEO />
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Portfolio */}
      <Route path="/" element={<Portfolio />} />

      {/* Admin Login */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;