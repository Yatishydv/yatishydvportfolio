import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaPhp, FaDatabase, FaPython, 
  FaJava, FaTerminal, FaCloud, FaGear, FaCode, FaUsers, FaBrain, FaLightbulb, 
  FaChevronLeft, FaChevronRight
} from "react-icons/fa6";
import { SiFirebase, SiTailwindcss, SiMongodb, SiLaravel, SiTypescript } from "react-icons/si";
import projectorImg from "../assets/projector.png";

// Fixed particle data to keep render pure
const BEAM_PARTICLES = [...Array(30)].map((_, i) => ({
  id: i,
  yStart: (i * 37) % 800,
  xStart: (i * 41) % 1200,
  yEnd: (i * 59) % 800,
  xEnd: (i * 67) % 1200,
  duration: 3 + (i % 5)
}));

const VintageProjector = () => {
  return (
    <div className="relative -rotate-90 lg:rotate-0 transition-transform duration-1000 origin-center flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="relative w-64 md:w-[450px] lg:w-[480px] flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-sky-100/20 blur-[100px] -z-10 rounded-full" />
        {/* Main Projector Image */}
        <div className="relative mix-blend-multiply">
          <img 
            src={projectorImg} 
            alt="Yatish Yadav Portfolio - Technical Stack & Skills Projection System" 
            className="w-full h-auto filter brightness-[1.1] contrast-[1.1]"
            style={{ 
              maskImage: "radial-gradient(circle at center, black 60%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 60%, transparent 95%)"
            }}
          />
          
          {/* Animated Reel 1 (Top Left) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[8%] left-[7%] w-[38%] aspect-square rounded-full border-[1px] border-white/10 mix-blend-overlay flex items-center justify-center overflow-hidden"
          >
            <div className="w-[80%] h-[1px] bg-white/20 rotate-45" />
            <div className="w-[80%] h-[1px] bg-white/20 -rotate-45" />
          </motion.div>
  
          {/* Animated Reel 2 (Top Right) */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-[3%] right-[5%] w-[45%] aspect-square rounded-full border-[1px] border-white/10 mix-blend-overlay flex items-center justify-center overflow-hidden"
          >
            <div className="w-[80%] h-[1px] bg-white/20 rotate-90" />
            <div className="w-[80%] h-[1px] bg-white/20 rotate-0" />
          </motion.div>
  
          {/* Lens Glow & Light Beam Origin */}
          <div className="absolute right-[8%] top-[47%] w-[20%] h-[20%] flex items-center justify-center">
            <motion.div 
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
                scale: [0.9, 1.2, 0.9],
                boxShadow: [
                  "0 0 30px rgba(56, 189, 248, 0.4)",
                  "0 0 60px rgba(56, 189, 248, 0.7)",
                  "0 0 30px rgba(56, 189, 248, 0.4)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-full bg-sky-100 blur-xl z-30"
            />
  
            {/* Integrated Light Beam - Extra long for mobile stacking */}
            <div className="absolute left-[-25%] top-1/2 -translate-y-1/2 w-[800px] md:w-[1000px] lg:w-[1200px] h-[500px] md:h-[700px] lg:h-[800px] pointer-events-none z-10 origin-left">
               {/* Dust particles */}
               <div className="absolute inset-0 overflow-hidden mix-blend-screen opacity-15 lg:opacity-20">
                 {BEAM_PARTICLES.map((p) => (
                   <motion.div
                     key={p.id}
                     animate={{ 
                       y: [p.yStart, p.yEnd],
                       x: [p.xStart, p.xEnd],
                       opacity: [0, 1, 0]
                     }}
                     transition={{ duration: p.duration, repeat: Infinity }}
                     className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full blur-[1px] absolute"
                   />
                 ))}
               </div>
               
               <motion.div 
                  animate={{ 
                    opacity: [0.15, 0.3, 0.2, 0.25, 0.15], 
                    skewY: [0, 0.1, -0.1, 0],
                    scaleY: [1, 1.01, 0.99, 1] 
                  }}
                  transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
                  className="w-full h-full origin-left filter blur-[8px] lg:blur-[10px]"
                  style={{ 
                    background: "linear-gradient(90deg, rgba(56, 189, 248, 0.5) 0%, rgba(56, 189, 248, 0.05) 85%, transparent 100%)",
                    clipPath: "polygon(0 49.5%, 100% 0, 100% 100%, 0 50.5%)" 
                  }}
               />
            </div>
          </div>
        </div>
  
        {/* Vibration Effect */}
        <motion.div 
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

function Skills() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const skillGroups = [
    {
      category: "Programming Languages",
      skills: [
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "Python", icon: <FaPython />, color: "#3776AB" },
        { name: "C / C++", icon: <FaCode />, color: "#00599C" },
        { name: "Java", icon: <FaJava />, color: "#007396" },
        { name: "PHP", icon: <FaPhp />, color: "#777BB4" }
      ]
    },
    {
      category: "Frontend Engineering",
      skills: [
        { name: "React.js", icon: <FaReact />, color: "#61DAFB" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
        { name: "UI/UX Design", icon: <FaLightbulb />, color: "#10B981" }
      ]
    },
    {
      category: "Backend & Systems",
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
        { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
        { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
        { name: "Database", icon: <FaDatabase />, color: "#4479A1" }
      ]
    },
    {
      category: "Soft Skills & Focus",
      skills: [
        { name: "Leadership", icon: <FaUsers />, color: "#6366F1" },
        { name: "Critical Thinking", icon: <FaBrain />, color: "#F59E0B" },
        { name: "Full Stack", icon: <FaGear />, color: "#F43F5E" }
      ]
    }
  ];

  const nextGroup = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % skillGroups.length);
  }, [skillGroups.length]);

  const prevGroup = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + skillGroups.length) % skillGroups.length);
  }, [skillGroups.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextGroup();
    }, 3000);

    return () => clearInterval(timer);
  }, [nextGroup]);

  const currentGroup = skillGroups[currentIdx];

  return (
    <section id="skills" className="py-32 px-6 md:px-16 bg-white relative overflow-hidden flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Refined Split Header Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 mb-32 relative px-4">
          
          {/* Left Side: Heading */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-slate-900 shadow-xl shadow-slate-200 text-[10px] font-mono text-white tracking-[0.3em] uppercase relative z-10"
            >
              Capabilities Portfolio
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter relative z-10"
            >
              My <span className="text-rose-500 italic">Specialized</span> Skills.
            </motion.h2>

            {/* Decorative Line under heading */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              className="h-1 bg-rose-500 mt-4 hidden lg:block"
            />
          </div>

          {/* Right Side: Data Spec Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative flex flex-col md:flex-row items-center md:items-start gap-6 max-w-xl"
          >
            {/* Status Column */}
            <div className="flex flex-col gap-2 text-left shrink-0">
               <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                 <span className="text-[9px] font-mono font-bold text-slate-800 uppercase tracking-widest">Sys_Status: Active</span>
               </div>
               <div className="flex items-center gap-2 opacity-30">
                 <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                 <span className="text-[9px] font-mono font-bold text-slate-800 uppercase tracking-widest">Sync: Optimized</span>
               </div>
            </div>

            {/* Main Data Frame */}
            <div className="relative p-6 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:border-rose-100 transition-colors text-left overflow-hidden">
               {/* Decorative Background Pattern */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
               
               <p className="text-slate-900 text-base md:text-lg font-bold leading-tight mb-2 relative z-10">
                 The <span className="text-rose-600">Machinery</span> behind the <span className="italic">Magic.</span>
               </p>
               <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed relative z-10">
                 Merging the <span className="text-slate-800">raw power of logic</span> with 
                 the <span className="text-slate-800">precision of design</span>. 
                 Architecting immersive digital futures, one pixel at a time.
               </p>
               
               {/* Frame Corners */}
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-200 group-hover:border-rose-300" />
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-200 group-hover:border-rose-300" />
            </div>
          </motion.div>

          {/* Scanning Line - Now absolute across the bottom of header */}
          <div className="absolute bottom-[-20px] left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent overflow-hidden">
            <motion.div 
              animate={{ left: ["-20%", "120%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 h-full w-40 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-32 relative">
          
          {/* Vintage Projector (Left) */}
          <div className="relative flex-shrink-0 z-20">
            <VintageProjector />
          </div>

          {/* Huge Screen (Right) - Enhanced 3D Look */}
          <div className="relative w-full lg:w-[950px] aspect-[16/9] z-20" style={{ perspective: "1500px" }}>
             <motion.div 
               initial={{ rotateY: 0 }}
               whileInView={{ rotateY: -20 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="w-full h-full relative"
               style={{ transformStyle: "preserve-3d" }}
             >
                {/* 3D Frame Body with Thickness */}
                <div className="absolute inset-x-[-40px] top-[-20px] bottom-[-50px] bg-slate-200 rounded-[60px] -z-20 shadow-[0_50px_100px_rgba(0,0,0,0.2)]" />
                
                {/* Real 3D Side Depth */}
                <div 
                  className="absolute left-[-40px] top-[-20px] bottom-[-50px] w-12 bg-slate-400 rounded-l-[60px] -z-10 origin-right" 
                  style={{ transform: "rotateY(-90deg) translateX(-24px)" }} 
                />

                <div 
                  className="w-full h-full bg-[#fdfaf5] rounded-[40px] border-[24px] border-slate-100 shadow-[inset_0_30px_60px_rgba(0,0,0,0.1),0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col items-center justify-center relative p-10"
                  style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Perspective Light Splash */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(224,242,254,0.5)_0%,transparent_70%)] pointer-events-none z-0" />

                    {/* Film Flicker Overlay */}
                    <motion.div 
                      animate={{ opacity: [0, 0.05, 0, 0.03, 0] }}
                      transition={{ duration: 0.2, repeat: Infinity }}
                      className="absolute inset-0 bg-black pointer-events-none z-20"
                    />
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIdx}
                        initial={{ opacity: 0, filter: "blur(30px)", scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
                        exit={{ opacity: 0, filter: "blur(30px)", scale: 0.95, y: -30 }}
                        transition={{ duration: 0.8, ease: "anticipate" }}
                        className="flex flex-col items-center w-full h-full justify-center gap-4"
                      >
                        {/* Slide Title Card - 3D Depth */}
                        <div className="flex flex-col items-center mb-2" style={{ transform: "translateZ(30px)" }}>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="h-[1px] w-6 bg-rose-500/20" />
                            <span className="text-[7px] font-mono font-bold text-rose-500 uppercase tracking-[0.4em]">Slide {String(currentIdx + 1).padStart(2, '0')}</span>
                            <span className="h-[1px] w-6 bg-rose-500/20" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">
                            {currentGroup.category.split(' ')[0]} <span className="text-rose-500 italic">{currentGroup.category.split(' ').slice(1).join(' ')}</span>
                          </h3>
                        </div>
                        
                        {/* Skills Grid - 3D Depth */}
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-3xl" style={{ transform: "translateZ(50px)" }}>
                             {currentGroup.skills.map((skill, idx) => (
                               <motion.div 
                                 key={idx}
                                 initial={{ opacity: 0, scale: 0.8 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: 0.1 + idx * 0.05 }}
                                 className="flex flex-col items-center p-3 rounded-xl bg-white/40 border border-white/60 hover:bg-white hover:border-rose-200 transition-all group/skill cursor-default"
                                 style={{ transformStyle: "preserve-3d" }}
                               >
                                  <div 
                                    className="text-2xl mb-1.5 transition-transform group-hover/skill:scale-110 drop-shadow-sm"
                                    style={{ color: skill.color, transform: "translateZ(20px)" }}
                                  >
                                    {skill.icon}
                                  </div>
                                  <span className="text-[8px] font-mono font-black uppercase tracking-widest text-slate-500 group-hover/skill:text-slate-900 transition-colors" style={{ transform: "translateZ(10px)" }}>
                                    {skill.name}
                                  </span>
                               </motion.div>
                             ))}
                        </div>
                        
                        {/* Slide Metadata - Compact */}
                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Technical Reel #7{currentIdx + 8}</span>
                            </div>
                            <span className="h-3 w-[1px] bg-slate-200" />
                            <div className="text-[8px] font-black uppercase tracking-widest text-slate-300">
                              Exposure: <span className="text-slate-400 italic">Auto-Focus</span>
                            </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Viewfinder Corners */}
                    <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-rose-500/20 rounded-tl-xl pointer-events-none" />
                    <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-rose-500/20 rounded-tr-xl pointer-events-none" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-rose-500/20 rounded-bl-xl pointer-events-none" />
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-rose-500/20 rounded-br-xl pointer-events-none" />
                </div>

                {/* Sleek Controls - Re-integrated into 3D Board for perfect perspective */}
                <div className="absolute bottom-[-36px] left-1/2 -translate-x-1/2 flex gap-10 items-center z-50">
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: "#fff5f5" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevGroup}
                      className="group w-7 h-7 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all"
                    >
                      <FaChevronLeft size={10} className="text-slate-500 group-hover:text-rose-500 transition-colors" />
                    </motion.button>

                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: "#e11d48" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextGroup}
                      className="w-7 h-7 rounded-full bg-rose-500 border border-rose-400 shadow-[0_5px_15px_rgba(244,63,94,0.3)] flex items-center justify-center text-white transition-all"
                    >
                      <FaChevronRight size={10} />
                    </motion.button>
                </div>
             </motion.div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-32 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
           <div className="flex items-center gap-3 font-mono font-bold text-xs text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Projector online : optical focal 100%
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
             Auto-Slide Active (3s) | Manual Cycle Enabled
           </p>
        </div>
      </div>
    </section>
  );
}

export default Skills;
