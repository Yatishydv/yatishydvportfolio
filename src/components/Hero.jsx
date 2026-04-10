import profile from "../assets/profile.jpg";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaReact, FaNodeJs, FaFileAlt, FaPlay } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SiTailwindcss, SiMongodb } from "react-icons/si";

function Hero({ openResume }) {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= DESKTOP / TABLET SOCIAL BAR ================= */}
      <div className="hidden sm:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-50 text-slate-400">
        <motion.a whileHover={{ y: -4, color: "#24292e" }} href="https://github.com/yatishydv" target="_blank" rel="noopener noreferrer" className="text-xl transition-colors">
          <FaGithub />
        </motion.a>
        <motion.a whileHover={{ y: -4, color: "#0077b5" }} href="https://www.linkedin.com/in/yatishydv" target="_blank" rel="noopener noreferrer" className="text-xl transition-colors">
          <FaLinkedin />
        </motion.a>
        <motion.a whileHover={{ y: -4, color: "#e1306c" }} href="https://instagram.com/yatishydv" target="_blank" rel="noopener noreferrer" className="text-xl transition-colors">
          <FaInstagram />
        </motion.a>
        <motion.a whileHover={{ y: -4, color: "#ea4335" }} href="mailto:yatish0155@gmail.com" className="text-xl transition-colors">
          <HiOutlineMail />
        </motion.a>
        <div className="w-[1px] h-20 bg-gradient-to-b from-slate-800 to-transparent"></div>
      </div>

      {/* ================= MOBILE SOCIAL BAR ================= */}
      <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-xl shadow-2xl border px-8 py-4 rounded-full flex gap-8 z-50 transition-colors bg-white/80 border-slate-200 text-slate-600">
        <a href="https://github.com/yatishydv" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900"><FaGithub size={20} /></a>
        <a href="https://www.linkedin.com/in/yatishydv" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5]"><FaLinkedin size={20} /></a>
        <a href="https://instagram.com/yatishydv" target="_blank" rel="noopener noreferrer" className="hover:text-[#e1306c]"><FaInstagram size={20} /></a>
        <a href="mailto:yatish0155@gmail.com" className="hover:text-[#ea4335]"><HiOutlineMail size={22} /></a>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section id="home" className="relative z-10 pt-24 md:pt-28 pb-32 min-h-screen flex items-center justify-center bg-transparent px-6 md:px-20 overflow-hidden font-primary">

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 80, 0],
              scale: [1, 1.2, 0.9, 1],
              rotate: [0, 45, -45, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -100, 60, 0],
              y: [0, 80, -40, 0],
              scale: [1, 1.3, 0.8, 1],
              rotate: [0, -30, 30, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 items-center gap-16 lg:gap-24 max-w-7xl w-full">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
              className="mb-6 inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-slate-200/50 shadow-2xl"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
              </span>
              <span className="text-[12px] font-black tracking-[0.2em] text-slate-700 uppercase">Available for new opportunities</span>
            </motion.div>

            <div className="relative mt-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-[70px] sm:text-[90px] md:text-[110px] lg:text-[130px] font-black leading-[0.85] tracking-tighter text-slate-900 font-secondary">
                  YATISH
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div
                  className="text-[70px] sm:text-[90px] md:text-[110px] lg:text-[130px] font-black leading-[0.85] tracking-tighter text-transparent font-secondary"
                  style={{ WebkitTextStroke: '2px rgba(100, 100, 100, 0.15)' }}
                >
                  KUMAR
                </div>
              </motion.div>
            </div>

            <div className="mt-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-500 via-indigo-500 to-rose-500 bg-clip-text text-transparent tracking-tight font-secondary bg-[length:200%_auto] animate-gradient"
              >
                Full Stack Developer
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-10 max-w-[600px] group relative"
              >
                {/* Visual Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-indigo-500 to-rose-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>

                <div className="relative bg-white/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/40 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                      session: developer.profile
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-400/50"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-400/50"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-400/50"></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Hidden SEO Keywords Section (sr-only hides from users but keeps for bots) */}
                    <h3 className="sr-only">Yatish Yadav Portfolio - Full Stack React Developer, MERN Developer India, Freelance Developer</h3>
                    <p className="text-slate-600 font-sans text-[18px] sm:text-[20px] leading-relaxed">
                      I am <span className="text-slate-950 font-black">Yatish Kumar</span>, a Full Stack Dev who builds <span className="text-slate-950 font-black">MERN apps</span> and treats <span className="text-rose-500 font-bold underline decoration-indigo-500/30 decoration-4 underline-offset-8">documentation</span> like a TOS agreement—I just skip to the end. I specialize in turning complex problems into "just one more fix" and coffee into <span className="text-indigo-500 font-bold">4 AM commits</span>.
                    </p>

                    <div className="pt-6 flex flex-wrap items-center gap-4 border-t border-slate-200/50">
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                        <span className="w-1 h-1 rounded-full bg-rose-500 animate-pulse"></span>
                        MERN Specialist
                      </div>
                      <span className="font-mono text-[11px] text-slate-400 italic">
                        &#123; status: "Debugging reality..." &#125;
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Compact Action Buttons Container */}
              <div className="mt-8 flex flex-wrap items-center gap-12">
                {/* Resumé Button - White Pill with Rose Dot */}
                <motion.button
                  onClick={openResume}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-white text-slate-900 rounded-full font-black text-[10px] tracking-[0.2em] uppercase shadow-xl border border-slate-100 hover:border-rose-500/30 transition-all flex items-center gap-3 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>View Resume</span>
                </motion.button>

                {/* Start Conversation - Original Link Style */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group cursor-pointer flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-all"
                  onClick={() => scrollToSection("contact")}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-transparent group-hover:border-rose-500 transition-all">
                    Start a Conversation
                  </span>
                  <span className="text-rose-500 animate-bounce-x">→</span>
                </motion.div>
              </div>


            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end mt-14 lg:mt-0"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [-1, 1, -1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              {/* Profile Image Container */}
              <div className="p-4 bg-white/40 backdrop-blur-3xl rounded-[48px] shadow-3xl border border-white/60 relative overflow-hidden group">
                <img
                  src={profile}
                  alt="Yatish Yadav - Full Stack React Developer & Programmer Portfolio"
                  className="w-[300px] sm:w-[380px] md:w-[420px] lg:w-[460px]
                             h-[380px] sm:h-[480px] md:h-[540px] lg:h-[580px]
                             object-cover rounded-[36px] transition-all duration-700 shadow-2xl group-hover:scale-[1.02]"
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -top-10 -right-6 sm:-right-12"
              >
                <div className="bg-white/95 backdrop-blur-2xl px-6 py-5 rounded-[24px] shadow-3xl border border-slate-200 z-20 flex items-center gap-5 hover:scale-105 transition-transform">
                  <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
                    <FaReact size={30} className="animate-spin-slow" />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-900 leading-tight">Product Architecture</p>
                    <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase mt-1">Frontend Engineering</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute -bottom-12 -left-6 sm:-left-16"
              >
                <div className="bg-white/95 backdrop-blur-2xl px-6 py-5 rounded-[24px] shadow-3xl border border-slate-200 z-20 flex items-center gap-5 hover:scale-105 transition-transform">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                    <FaNodeJs size={30} />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-900 leading-tight">System Design</p>
                    <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase mt-1">Backend Infrastructure</p>
                  </div>
                </div>
              </motion.div>

              {/* Orbital Icons */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none hidden lg:block"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-cyan-500 border border-slate-200">
                  <SiTailwindcss size={24} />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-emerald-500 border border-slate-200">
                  <SiMongodb size={24} />
                </div>
              </motion.div>

            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
}

export default Hero;