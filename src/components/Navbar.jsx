import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuRef = useRef(null);

  const navItems = ["home", "about", "projects", "contact"];

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
    <nav className="fixed top-0 w-full flex justify-center pt-8 text-black z-50">

      {/* Desktop Pill Navbar */}
      <div className="hidden md:flex gap-4 bg-[#eaeaea] p-2 rounded-full shadow-sm relative">

        {navItems.map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="relative px-6 py-2 rounded-full text-xs tracking-wide font-normal"
          >
            {active === id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-black rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            <span
              className={`relative z-10 ${
                active === id ? "text-white" : "text-black"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden absolute right-6 top-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 bg-[#eaeaea] rounded-2xl shadow-md px-8 py-6 md:hidden"
          >
            <div className="flex flex-col gap-5 text-center text-sm tracking-wide font-light">
              {navItems.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={active === id ? "font-semibold" : ""}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}

export default Navbar;