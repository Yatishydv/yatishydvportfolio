import { useState, useEffect } from "react";
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

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    // Always start from top on refresh
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-slate-900 min-h-screen overflow-x-hidden transition-colors duration-500 selection:bg-rose-500/30">
      <ScrollProgress />
      <Navbar 
        openResume={() => setIsResumeOpen(true)} 
      />
      <main>
        <Hero openResume={() => setIsResumeOpen(true)} />
        <About openResume={() => setIsResumeOpen(true)} />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <HiddenSEO />

      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}

export default App;