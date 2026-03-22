import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { FaGithub, FaArrowRight, FaCode, FaRocket } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { SiJavascript, SiReact, SiFirebase, SiTailwindcss, SiWebrtc, SiSocketdotio, SiNodedotjs, SiExpress, SiPhp, SiMysql, SiMongodb, SiJsonwebtokens, SiLaravel } from "react-icons/si";

// Standardized Project Assets (Stored in public folder)
const projectAssets = {
  foodzy: "/foodzy.png",
  blink: "/blink.png",
  portfolio: "/portfolio.png",
  freshmart: "/freshmart.png",
  colabx: "/colabx.png"
};

const TechBadge = ({ name }) => {
  const icons = {
    "React": <SiReact className="text-[#61DAFB]" />,
    "Firebase": <SiFirebase className="text-[#FFCA28]" />,
    "Tailwind": <SiTailwindcss className="text-[#06B6D4]" />,
    "WebRTC": <SiWebrtc className="text-[#339933]" />,
    "Node.js": <SiNodedotjs className="text-[#339933]" />,
    "Express": <SiExpress className="text-slate-400" />,
    "Socket.IO": <SiSocketdotio className="text-slate-400" />,
    "JS": <SiJavascript className="text-[#F7DF1E]" />,
    "PHP": <SiPhp className="text-[#777BB4]" />,
    "MySQL": <SiMysql className="text-[#4479A1]" />,
    "MongoDB": <SiMongodb className="text-[#47A248]" />,
    "JWT": <SiJsonwebtokens className="text-[#000000]" />,
    "Laravel": <SiLaravel className="text-[#FF2D20]" />
  };
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase tracking-tight">
      {icons[name] || <FaCode size={8} />}
      {name}
    </div>
  );
};

const ProjectCard = ({ project, index, activeOffset, onCardClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (Math.abs(activeOffset) > 0.1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isActive = Math.abs(activeOffset) < 0.1;
  const distance = Math.abs(activeOffset);
  
  // Spaced Tap-Centric Transform (V7.4 Spacing)
  const cardX = activeOffset * (window.innerWidth < 1024 ? 120 : 300); 
  const cardRotateY = activeOffset * -22;
  const cardZ = -Math.round(distance * 120); 
  const cardScale = 1 - distance * 0.12;
  const cardOpacity = 1 - distance * 0.45;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        e.stopPropagation();
        onCardClick(index);
      }}
      layout
      animate={{
        x: cardX,
        rotateY: cardRotateY,
        z: cardZ,
        scale: cardScale,
        opacity: cardOpacity,
        filter: distance > 0.1 ? `blur(${Math.min(distance * 1.5, 2)}px)` : "blur(0px)",
      }}
      transition={{ 
        type: "spring", 
        stiffness: 450, 
        damping: 45,
        mass: 1,
        restDelta: 0.001
      }}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : cardRotateY,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter"
      }}
      className={`relative w-full max-w-[420px] min-h-[580px] rounded-[32px] overflow-hidden bg-white flex flex-col cursor-pointer pointer-events-auto ${isActive ? 'shadow-[0_20px_60px_rgba(159,18,57,0.45)] border-transparent' : 'shadow-lg border border-slate-50'}`}
    >
      <div className="flex-1 flex flex-col relative">
        {/* Mirror Reflection Overlay */}
        <motion.div 
            animate={{ x: activeOffset * 100 }}
            className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-30" 
        />
        
        {/* Browser Header */}
        <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2 shrink-0 z-10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 max-w-[200px] h-5 bg-white rounded-md border border-slate-100 mx-auto flex items-center px-2">
            <div className="w-full h-1 bg-slate-50 rounded-full" />
          </div>
        </div>

        {/* Screenshot Area with Scanlines & Parallax */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 shrink-0">
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle,transparent_20%,#000_100%)]" />
        </div>

        {/* Project Details */}
        <div className="flex-1 p-8 flex flex-col justify-between bg-white text-left relative z-10 overflow-hidden">
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
               <span className="px-3 py-1 rounded-full bg-rose-50 text-[9px] font-black text-rose-500 uppercase tracking-widest border border-rose-100">
                {project.status}
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-300 tracking-tighter">{project.version}</span>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase">
              {project.title.split('—')[0].trim()}
            </h3>
            
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t, i) => (
                  <div key={i} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {t}
                  </div>
                ))}
            </div>
          </div>

          {/* Actions */}
          <div className={`flex gap-4 mt-auto transition-all duration-700 ${!isActive ? "pointer-events-none opacity-20" : "pointer-events-auto opacity-100"}`}>
            <motion.a 
              onClick={(e) => e.stopPropagation()}
              whileHover={{ y: -5, backgroundColor: "#f43f5e" }}
              whileTap={{ scale: 0.95 }}
              href={project.github} 
              target="_blank" 
              className="flex-1 h-12 bg-slate-900 rounded-2xl flex items-center justify-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10"
            >
              <FaGithub size={16} />
              Code
            </motion.a>
            {project.live !== "#" && (
              <motion.a 
                onClick={(e) => e.stopPropagation()}
                whileHover={{ y: -5, borderColor: "#f43f5e", color: "#f43f5e" }}
                whileTap={{ scale: 0.95 }}
                href={project.live} 
                target="_blank" 
                className="flex-1 h-12 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-100"
              >
                <HiOutlineExternalLink size={16} />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ["all", "React", "Node.js", "AI", "WebRTC", "PHP"];

  const projects = [
    {
      title: "Foodzy — Online Food Ordering Platform",
      description: "Full-stack platform with AI chatbot (Gemini API) and 3D features using THREE.js. Features 40% engagement boost and responsive cart system.",
      tech: ["React", "JS", "Firebase", "Tailwind", "THREE.js"],
      github: "https://github.com/Yatishydv/Foodzy",
      live: "https://foodzy-eat.vercel.app/",
      category: "React",
      status: "PRODUCTION",
      version: "Nov 2025",
      image: projectAssets.foodzy,
    },
    {
      title: "Blink — Real-Time Video Chat",
      description: "Anonymous 1-to-1 video chat app using WebRTC and Socket.IO. Low-latency signaling and privacy-focused design (no login required).",
      tech: ["WebRTC", "Node.js", "Socket.IO", "Express", "JS"],
      github: "https://github.com/Yatishydv/Blink-video-chat-app",
      live: "https://blink-video-chat-app.onrender.com/",
      category: "WebRTC",
      status: "STABLE",
      version: "Jan 2026",
      image: projectAssets.blink,
    },
    {
      title: "Yatish | Professional Portfolio",
      description: "Advanced developer portfolio featuring immersive terminal-style UI, 3D carousel, and cinematic skills projection. Optimized for cross-device performance.",
      tech: ["React", "Framer Motion", "Tailwind", "Vite"],
      github: "https://github.com/Yatishydv/yatishydvportfolio",
      live: "https://yatishydvportfolio.vercel.app/",
      category: "React",
      status: "LIVE",
      version: "v1.0.0",
      image: projectAssets.portfolio,
    },
    {
        title: "FreshMart — MERN Dev",
        description: "Full-stack inventory system research. Comprehensive exploration of atomic database updates and JWT security layers.",
        tech: ["React", "Express", "MongoDB", "JWT"],
        github: "https://github.com/Yatishydv/onlinegrosystem",
        live: "#",
        category: "Node.js",
        status: "STABLE",
        version: "v3.2.0",
        image: projectAssets.freshmart,
    },
    {
        title: "ColabX — Entrepreneur Platform",
        description: "Connecting 300+ entrepreneurs to schemes. Features secure PHP/MySQL login and multi-tenant infrastructure.",
        tech: ["HTML", "CSS", "JS", "PHP", "MySQL"],
        github: "https://github.com/Yatishydv/ColabX",
        live: "#",
        category: "PHP",
        status: "LEGACY",
        version: "Apr 2025",
        image: projectAssets.colabx,
    },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter || p.tech.includes(filter));

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };
  
  const dragX = useMotionValue(0);
  
  const handleDragEnd = (_, info) => {
    if (window.innerWidth >= 1024) return;
    const threshold = 50;
    if (info.offset.x > threshold) handlePrev();
    else if (info.offset.x < -threshold) handleNext();
    dragX.set(0);
  };

  return (
    <section id="projects" className="relative px-6 md:px-16 pt-20 pb-24 bg-white overflow-hidden perspective-2000">
      <div className="max-w-7xl mx-auto relative pt-0">
        <h1 className="absolute text-[90px] sm:text-[130px] md:text-[160px] lg:text-[200px] font-black text-slate-100 top-0 left-0 md:-left-8 lg:-left-14 pointer-events-none transition-all duration-700 uppercase select-none leading-none z-0">
            PROJECTS
        </h1>

        <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
              <div className="max-w-lg">
                  <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-[10px] font-bold text-white tracking-[0.2em] uppercase mb-6"
                  >
                    <div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
                    Project Reel
                  </motion.div>
                  <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none"
                  >
                      Recent <br />
                      <span className="text-rose-500 italic">Projects.</span>
                  </motion.h2>
                  <p className="mt-6 text-slate-500 text-lg font-medium leading-relaxed italic max-w-sm">
                  Highlighting my technical builds, academic experiments, and real-world creations.
                  </p>
              </div>

              <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                  <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${
                      filter === cat 
                      ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-rose-500/50 hover:text-rose-500"
                      }`}
                  >
                      {cat}
                  </button>
                  ))}
              </div>
            </div>

            {/* Swipe & Tap Cinematic Reel (V8.0) */}
            <div className="relative pt-20 px-4 md:px-0 flex justify-center items-center h-[650px] md:h-[750px] overflow-visible perspective-2000">
                <motion.div 
                    drag={window.innerWidth < 1024 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    style={{ x: dragX }}
                    className="relative flex justify-center items-center w-full h-full cursor-default preserve-3d"
                >
                    {filteredProjects.map((project, index) => {
                        let activeOffset = index - activeIndex;
                        const total = filteredProjects.length;
                        
                        if (activeOffset > total / 2) activeOffset -= total;
                        if (activeOffset < -total / 2) activeOffset += total;

                        const isVisible = Math.abs(activeOffset) <= 2;
                        if (!isVisible) return null;

                        return (
                            <motion.div
                                key={project.title}
                                initial={false}
                                onClick={() => setActiveIndex(index)}
                                animate={{ 
                                    zIndex: 10 - Math.round(Math.abs(activeOffset)),
                                }}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 450, 
                                  damping: 45 
                                }}
                                className="absolute flex justify-center items-center preserve-3d cursor-pointer pointer-events-auto"
                            >
                                <ProjectCard 
                                    project={project} 
                                    index={index} 
                                    activeOffset={activeOffset} 
                                    onCardClick={setActiveIndex}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;