import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function Education() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const educationData = [
    {
      institution: "Lovely Professional University",
      degree: "B.Tech in Computer Science Engineering",
      duration: "Aug 2023 – Present",
      grade: "CGPA: 7.67",
      location: "Phagwara, Punjab",
      status: "STABLE",
      build: "v4.0.2",
      icon: "⚡"
    },
    {
      institution: "Machine Learning Made Easy",
      degree: "From Basic to AI Application",
      duration: "Jun 2025 – Jul 2025",
      grade: "Python, ML, SQL",
      location: "Online Training",
      status: "CERTIFIED",
      build: "v4.1.0",
      icon: "🤖",
      details: [
        "Learned supervised learning, classification, and feature engineering",
        "Used Python, NumPy, Pandas, Scikit-learn",
        "Performed data analysis using SQL",
        "Improved problem-solving and algorithmic thinking"
      ]
    },
    {
      institution: "S.B.S School Badhwana",
      degree: "Intermediate (Class 12)",
      duration: "Apr 2022 – Mar 2023",
      grade: "Percentage: 93.8%",
      location: "Charkhi Dadri, Haryana",
      status: "COMPLETED",
      build: "v3.1.0",
      icon: "🛠️"
    },
    {
      institution: "S.B.S School Badhwana",
      degree: "Matriculation (Class 10)",
      duration: "Apr 2020 – Mar 2021",
      grade: "Percentage: 100%",
      location: "Charkhi Dadri, Haryana",
      status: "ARCHIVED",
      build: "v2.0.0",
      icon: "📚"
    }
  ];

  return (
    <section id="education" className="py-24 px-6 md:px-16 bg-white relative overflow-hidden" ref={containerRef}>
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/5 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full" 
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-[10px] font-mono text-white tracking-widest uppercase mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Academic Roadmap
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none"
            >
              Educational <span className="text-rose-500 italic">Journey.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-slate-500 font-medium text-sm md:text-base text-center md:text-right max-w-sm md:max-w-[280px]"
          >
            A log of my academic deployments and knowledge acquisitions.
          </motion.p>
        </div>

        <div className="relative">
          {/* Central Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-100 -translate-x-1/2">
            <motion.div 
              style={{ height: pathHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-rose-500 to-indigo-500" 
            />
          </div>

          <div className="space-y-12 relative">
            {educationData.map((edu, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Milestone Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center z-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="w-3 h-3 bg-white border-2 border-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.3)]" 
                  />
                  <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-md animate-pulse" />
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-1 md:flex-none md:w-[45%] ml-10 md:ml-0 group"
                >
                  <div className="relative p-5 md:p-8 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-rose-500/5 hover:border-rose-500/20 transition-all duration-500 overflow-hidden">
                    {/* Background Tag */}
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                      <span className="text-8xl font-black select-none pointer-events-none">{edu.icon}</span>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 uppercase">
                          {edu.build}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">{edu.status}</span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FaCalendarAlt className="text-rose-400" />
                        {edu.duration}
                      </div>
                    </div>

                    <h3 className="text-lg md:text-2xl font-black text-slate-900 mb-2 group-hover:text-rose-500 transition-colors leading-tight">
                      {edu.institution}
                    </h3>
                    <p className="text-slate-600 font-bold text-sm mb-6 flex items-start gap-2">
                      <FaGraduationCap className="mt-1 text-indigo-500 flex-shrink-0" />
                      {edu.degree}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                      <div className="flex flex-col items-start">
                        <span className="block text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1">Performance</span>
                        <span className="text-sm font-black text-slate-900 group-hover:text-rose-600 transition-colors">{edu.grade}</span>
                      </div>
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="block text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1">Location</span>
                        <span className="text-[11px] font-bold text-slate-500 flex items-center justify-end gap-1">
                          <FaMapMarkerAlt className="text-rose-400 shrink-0" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    {edu.details && (
                      <div className="mt-6 space-y-2 border-t border-slate-50 pt-6">
                        {edu.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{detail}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Subtle Progress Bar */}
                    <div className="mt-6 h-0.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 opacity-60" 
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
