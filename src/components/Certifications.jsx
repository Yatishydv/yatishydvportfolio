import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useCallback, useMemo, useEffect } from "react";
import { HiX } from "react-icons/hi";
import { FaAward, FaExternalLinkAlt, FaCalendarAlt, FaFingerprint, FaShieldAlt, FaInfoCircle } from "react-icons/fa";
import { SiOracle, SiGooglecloud } from "react-icons/si";

// Generated assets

const HolographicFoil = ({ x, y, themeColor }) => {
  const foilX = useTransform(x, [-1, 1], ["0%", "100%"]);
  const foilY = useTransform(y, [-1, 1], ["0%", "100%"]);
  
  return (
    <motion.div 
      className="absolute inset-0 z-10 pointer-events-none mix-blend-color-dodge opacity-0 group-hover:opacity-70 transition-opacity duration-700"
      style={{
        background: `
          radial-gradient(circle at ${foilX} ${foilY}, 
            ${themeColor}44 0%, 
            rgba(255, 255, 255, 0.4) 30%,
            transparent 70%
          ),
          repeating-linear-gradient(
            45deg,
            ${themeColor}11 0%,
            rgba(255, 255, 255, 0.05) 10%,
            ${themeColor}11 20%
          )
        `,
        backgroundSize: "200% 200%",
      }}
    />
  );
};

const CertificateCard = ({ cert, index, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const shimmerX = useTransform(mouseXSpring, [-0.5, 0.5], ["-200%", "200%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={onClick}
      className={`group relative min-h-[420px] rounded-[40px] cursor-pointer preserve-3d transition-all duration-700 ${cert.span || "col-span-1"}`}
    >
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)"
        }}
        className={`relative w-full h-full rounded-[40px] overflow-hidden border-[6px] border-white/80 shadow-2xl transition-colors duration-700 ${cert.bgClass || "bg-white"}`}
      >
        <HolographicFoil x={x} y={y} themeColor={cert.color} />

        <div className={`absolute inset-0 rounded-[inherit] opacity-10 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${cert.gradientFrom} ${cert.gradientTo}`} />

        <div className="absolute inset-0 border-t-[2px] border-l-[2px] border-white/50 rounded-[inherit] z-20 pointer-events-none" />
        <div className="absolute inset-0 border-b-[2px] border-r-[2px] border-slate-900/10 rounded-[inherit] z-20 pointer-events-none" />

        <motion.div 
          style={{ x: shimmerX }}
          className="absolute inset-0 rounded-[inherit] z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
        />

        <div className="relative z-10 p-10 h-full flex flex-col items-center text-center justify-between pointer-events-none">
          <div className="w-full flex justify-between items-center opacity-60 group-hover:opacity-100 transition-all duration-700">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-500" style={{ color: `${cert.color}99` }}>{cert.id}</span>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border shadow-sm" style={{ borderColor: `${cert.color}22` }}>
               <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: cert.color }} />
               <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">Verified</span>
            </div>
          </div>

          <div className="relative my-7" style={{ transform: "translateZ(60px)" }}>
            <motion.div 
               className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-2xl border transition-all duration-700"
               style={{ borderColor: `${cert.color}33`, color: cert.color }}
            >
                {cert.icon || <FaAward size={48} />}
            </motion.div>
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full border bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-700"
              style={{ borderColor: `${cert.color}44`, color: cert.color }}
            >
              <FaFingerprint size={16} />
            </motion.div>
          </div>

          <div className="w-full space-y-4" style={{ transform: "translateZ(30px)" }}>
            <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
              {cert.name}
            </h3>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[11px] font-mono font-black uppercase tracking-[0.4em]" style={{ color: cert.color }}>{cert.issuer}</p>
              <div className="h-[3px] w-8 rounded-full transition-all duration-700 group-hover:w-16" style={{ backgroundColor: cert.color }} />
            </div>
          </div>

          <div className="w-full pt-8 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-all duration-700">
            <div className="flex items-center gap-2 text-slate-500">
              <FaCalendarAlt size={12} style={{ color: cert.color }} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{cert.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaAward size={14} style={{ color: cert.color }} />
              <span className="text-[9px] font-mono font-black uppercase tracking-tighter text-slate-500">Archive-V5.0</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-[inherit] opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[size:24px_24px]" />
      </motion.div>

      <div 
        className="absolute inset-x-10 bottom-0 h-10 blur-[50px] rounded-full -z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-700" 
        style={{ backgroundColor: cert.color }}
      />
    </motion.div>
  );
};

const SimpleCertificateModal = ({ cert, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop matching ResumeModal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-md bg-slate-900/40"
      />

      {/* Modal Content matching ResumeModal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl h-[90vh] rounded-[40px] shadow-3xl overflow-hidden flex flex-col bg-white border border-slate-100"
      >
        {/* Header matching ResumeModal */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: cert.color, boxShadow: `0 10px 20px -5px ${cert.color}44` }}
            >
               {cert.icon ? cert.icon : <FaAward size={20} />}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                {cert.name}
              </h3>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                {cert.issuer}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg bg-slate-100 text-slate-400 hover:bg-rose-500 hover:text-white"
            >
              <HiX size={24} />
            </button>
          </div>
        </div>

        {/* Body matching ResumeModal */}
        <div className="flex-grow overflow-auto relative bg-slate-50 p-6 md:p-12 flex justify-center items-center">
            <img 
              src={cert.image} 
              alt={cert.name} 
              className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white"
            />
        </div>
        
        {/* Mobile Info Strip */}
        <div className="p-4 text-center md:hidden border-t border-slate-100 bg-white">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            {cert.id}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    { 
      name: "Oracle Data Platform 2025 Certified Foundations Associate", 
      issuer: "Oracle University", 
      image: "/1.png",
      date: "Mar 2026",
      id: "ORCL-FND-2025",
      icon: <SiOracle size={48} />,
      span: "md:col-span-2",
      color: "#f80000",
      gradientFrom: "from-red-500",
      gradientTo: "to-orange-500",
      bgClass: "bg-red-50/30"
    },
    { 
      name: "Master Generative AI & Generative AI tools (ChatGPT & more)", 
      issuer: "Udemy", 
      image: "/2.png",
      date: "Aug 2025",
      id: "UD-GEN-0825",
      icon: <SiGooglecloud size={48} />,
      color: "#4285f4",
      gradientFrom: "from-blue-500",
      gradientTo: "to-emerald-500",
      bgClass: "bg-blue-50/30"
    },
    { 
      name: "TCP/IP and Advanced Networking Topics", 
      issuer: "Coursera", 
      image: "/3.png",
      date: "Nov 2024",
      id: "CR-TCP-1124",
      icon: <FaAward size={48} />,
      color: "#0056D2",
      gradientFrom: "from-blue-600",
      gradientTo: "to-cyan-500",
      bgClass: "bg-indigo-50/30"
    },
    { 
      name: "Computer Networking — Bits & Bytes", 
      issuer: "Coursera", 
      image: "/4.png",
      date: "Sep 2024",
      id: "CR-NET-0924",
      icon: <FaAward size={32} />,
      color: "#0056D2",
      gradientFrom: "from-blue-700",
      gradientTo: "to-indigo-500",
      bgClass: "bg-slate-50/30"
    },
    { 
      name: "Hardware and Operating Systems", 
      issuer: "Coursera", 
      image: "/5.png",
      date: "Sep 2024",
      id: "CR-HW-0924",
      icon: <FaAward size={32} />,
      color: "#777BB4",
      gradientFrom: "from-purple-500",
      gradientTo: "to-fuchsia-500",
      bgClass: "bg-purple-50/30"
    }
  ];

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedCert]);

  return (
    <section id="certifications" className="relative py-32 px-6 md:px-16 bg-white overflow-hidden perspective-2000">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Background Section Title */}
        <h1 className="absolute text-[80px] sm:text-[110px] md:text-[120px] lg:text-[150px] font-black text-slate-100 top-28 left-10 md:left-4 pointer-events-none transition-all duration-700 uppercase select-none leading-none z-0">
            CERTIFICATES
        </h1>

        <div className="relative z-10 pt-10">
            <div className="max-w-xl mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-[10px] font-black text-white tracking-[0.3em] uppercase mb-8 shadow-xl shadow-slate-900/20"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Professional Credentials
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none"
                >
                    My <br />
                    <span className="text-rose-500 italic">Certifications.</span>
                </motion.h2>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-rose-500" />
                  <p className="text-slate-500 text-sm font-black uppercase tracking-[0.2em]">
                    Validating my technical expertise through global standards.
                  </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {certifications.map((cert, i) => (
                    <CertificateCard 
                        key={i} 
                        cert={cert} 
                        index={i} 
                        onClick={() => setSelectedCert(cert)} 
                    />
                ))}
            </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <SimpleCertificateModal 
            cert={selectedCert} 
            onClose={() => setSelectedCert(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Certifications;
