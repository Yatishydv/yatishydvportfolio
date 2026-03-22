import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar({ openResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuRef = useRef(null);

  const navItems = ["home", "about", "education", "skills", "projects", "certifications", "contact"];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  // Detect active section on scroll + refresh
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let id of navItems) {
        const section = document.getElementById(id);
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActive(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 w-full flex justify-center pt-8 text-slate-50 z-50">

      {/* Desktop Pill Navbar */}
      <div className="hidden md:flex gap-1 bg-white/80 border-slate-200 shadow-xl backdrop-blur-xl p-1.5 rounded-full border relative">

        {navItems.map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="relative px-5 py-2 rounded-full text-[12px] tracking-tight font-bold transition-all"
          >
            {active === id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-rose-500 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <span
              className={`relative z-10 ${
                active === id ? "text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {(id === "certifications" ? "Certificates" : id).charAt(0).toUpperCase() + (id === "certifications" ? "Certificates" : id).slice(1)}
            </span>
          </button>
        ))}

        <div className="w-[1px] h-6 bg-slate-200 my-auto mx-1" />

        <motion.button
          onClick={openResume}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-full text-[11px] font-black tracking-widest uppercase shadow-lg bg-slate-900 text-white shadow-black/10"
        >
          Resume
        </motion.button>
      </div>

      {/* Mobile Hamburger Overlay */}
      <div className="md:hidden absolute right-6 top-8 flex gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex items-center justify-center backdrop-blur-lg rounded-2xl shadow-xl border text-2xl bg-white/90 border-slate-200 text-slate-900"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-24 left-6 right-6 backdrop-blur-3xl rounded-3xl shadow-2xl border p-6 md:hidden overflow-hidden bg-white/95 border-slate-200"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full py-3 px-6 text-left rounded-2xl text-xs font-bold transition-all ${
                    active === id 
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {(id === "certifications" ? "Certificates" : id).charAt(0).toUpperCase() + (id === "certifications" ? "Certificates" : id).slice(1)}
                </button>
              ))}
              
              <button
                onClick={() => { openResume(); setIsOpen(false); }}
                className="w-full py-4 px-6 text-center rounded-2xl text-xs font-black tracking-widest uppercase mt-2 shadow-lg bg-slate-900 text-white"
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}

export default Navbar;