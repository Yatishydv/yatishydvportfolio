import profile from "../assets/profile.jpg";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function Hero() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= DESKTOP / TABLET SOCIAL BAR ================= */}
      <div className="hidden sm:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-50 text-gray-600">
        
        <motion.a whileHover={{ y: -4 }} href="https://github.com/yatishydv" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-black transition">
          <FaGithub />
        </motion.a>

        <motion.a whileHover={{ y: -4 }} href="https://linkedin.com/in/yatishydv" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-black transition">
          <FaLinkedin />
        </motion.a>

        <motion.a whileHover={{ y: -4 }} href="https://instagram.com/yatishydv" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-black transition">
          <FaInstagram />
        </motion.a>

        <motion.a whileHover={{ y: -4 }} href="mailto:yatish0155@gmail.com" className="text-xl hover:text-black transition">
          <HiOutlineMail />
        </motion.a>

        <div className="w-[1px] h-16 bg-gray-400"></div>
      </div>

      {/* ================= MOBILE SOCIAL BAR ================= */}
      <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg px-6 py-3 rounded-full flex gap-6 text-gray-600 z-50">
        <a href="https://github.com/yatishydv" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://linkedin.com/in/yatishydv" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://instagram.com/yatishydv" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="mailto:yatish0155@gmail.com"><HiOutlineMail /></a>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section id="home" className="pt-24 md:pt-28 min-h-screen flex items-center justify-center bg-[#f3f3f3] px-6 md:px-16">
        <div className="grid lg:grid-cols-2 items-center gap-16 lg:gap-24 max-w-7xl w-full">

          {/* LEFT SIDE */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            
            {/* --- NAME BLOCK SAME --- */}
            <div className="text-center">
              <div className="relative inline-block leading-none">
                <span className="absolute inset-0 -translate-y-3 md:-translate-y-5 text-gray-400 opacity-20 font-black text-[70px] sm:text-[95px] md:text-[120px] lg:text-[150px] select-none">YATISH</span>
                <span className="absolute inset-0 -translate-y-1 md:-translate-y-3 text-gray-400 opacity-40 font-black text-[70px] sm:text-[95px] md:text-[120px] lg:text-[150px] select-none">YATISH</span>
                <span className="absolute inset-0 translate-y-1 md:translate-y-3 text-gray-400 opacity-40 font-black text-[70px] sm:text-[95px] md:text-[120px] lg:text-[150px] select-none">YATISH</span>
                <span className="absolute inset-0 translate-y-3 md:translate-y-5 text-gray-400 opacity-20 font-black text-[70px] sm:text-[95px] md:text-[120px] lg:text-[150px] select-none">YATISH</span>

                <h1 className="relative font-black text-[70px] sm:text-[95px] md:text-[120px] lg:text-[150px]">
                  YATISH
                </h1>
              </div>

              <h2 className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-[0.2em]" style={{ textShadow: "0px 6px 14px rgba(0,0,0,0.25)" }}>
                KUMAR
              </h2>
            </div>

            <div className="mt-10">
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                Full Stack Developer
              </p>

              <div className="mt-6 flex">
                <div className="w-[3px] bg-black mr-4 rounded-full"></div>

                <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-500 leading-7 md:leading-8 font-serif max-w-xl">
                  I design and develop scalable web applications that blend refined 
                  frontend experiences with robust backend systems. Focused on clean 
                  architecture, smooth interactions and performance-driven solutions.
                </p>
              </div>

              {/* ===== ONLY THESE TWO UPDATED ===== */}
              <div className="mt-8 flex gap-8">
                <motion.a
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection("projects")}
                  className="relative text-base md:text-lg font-medium cursor-pointer"
                >
                  View Work
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black"></span>
                </motion.a>

                <motion.a
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection("contact")}
                  className="text-base md:text-lg font-medium cursor-pointer flex items-center gap-2"
                >
                  Contact →
                </motion.a>
              </div>

            </div>
          </motion.div>

          {/* RIGHT SIDE SAME */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center mt-10 lg:mt-0"
          >
            <div className="absolute bottom-[-18px] w-[260px] sm:w-[320px] md:w-[360px] lg:w-[340px] h-[30px] md:h-[40px] bg-black/40 blur-xl rounded-full opacity-50"></div>

            <motion.div
              initial={{ rotate: -4 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative z-10"
            >
              <img
                src={profile}
                alt="Yatish Kumar"
                className="w-[260px] sm:w-[320px] md:w-[360px] lg:w-[420px]
                           h-[330px] sm:h-[400px] md:h-[460px] lg:h-[520px]
                           object-cover rounded-xl
                           shadow-[20px_25px_50px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
}

export default Hero;