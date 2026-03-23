import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalSteps = 60;
      const increment = end / totalSteps;
      const stepTime = (duration * 1000) / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}</span>;
};

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: "system", content: "Yatish-OS v1.0.4 loaded successfully." },
    { type: "system", content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const commands = {
    help: "Available commands: whoami, skills, education, clear, contact, coffee",
    whoami: "Yatish Kumar: A full-stack developer who builds MERN apps and treats documentation like a TOS agreement—I just skip to the end. Currently pursuing B.Tech CSE at LPU.",
    skills: "Frontend: React, Tailwind, JavaScript | Backend: Node, Express, PHP, Laravel, Firebase | Languages: C, C++, Python, Java",
    education: "B.Tech CSE @ Lovely Professional University (CGPA: 7.67) | Class 12 @ SBS School (93.8%) | Class 10 @ SBS School (100%)",
    contact: "Email: yatish0155@gmail.com | GitHub: @Yatishydv | LinkedIn: /in/yatishydv | Phone: +91-9812101423",
    coffee: "Error: Coffee not found. Please insert more caffeine to continue coding.",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, { type: "user", content: input }];

    if (cmd === "clear") {
      setHistory([
        { type: "system", content: "Yatish-OS v1.0.4 loaded successfully." },
        { type: "system", content: "Type 'help' to see available commands." },
      ]);
    } else if (commands[cmd]) {
      newHistory.push({ type: "bot", content: commands[cmd] });
      setHistory(newHistory);
    } else {
      newHistory.push({ type: "bot", content: `Command not found: ${cmd}. Type 'help' for assistance.` });
      setHistory(newHistory);
    }
    setInput("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden font-mono text-sm w-full max-w-2xl mx-auto md:mx-0">
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">terminal — bash</div>
        <div className="w-10" />
      </div>
      <div 
        ref={scrollRef}
        className="p-6 h-[320px] overflow-y-auto custom-scrollbar flex flex-col gap-3"
      >
        {history.map((line, i) => (
          <div key={i} className={`${line.type === "user" ? "text-emerald-400" : line.type === "system" ? "text-slate-500 italic" : "text-slate-300"}`}>
            {line.type === "user" ? <span className="text-rose-500 mr-2">yatish@portfolio:~$</span> : null}
            {line.content}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-rose-500 mr-2">yatish@portfolio:~$</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-emerald-400 w-full p-0 m-0"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

function About({ openResume }) {
  return (
    <section id="about" className="relative z-20 py-28 px-6 md:px-16 bg-white overflow-hidden">

      <div className="relative max-w-7xl mx-auto">

        {/* Background ABOUT */}
        <h1
          className="absolute
                     text-[90px] sm:text-[130px] md:text-[160px] lg:text-[200px]
                     font-black
                     text-slate-100
                     top-0
                     left-0
                     md:-left-8 lg:-left-14
                     pointer-events-none transition-all duration-700 uppercase">
          ABOUT
        </h1>

        {/* Content */}
        <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 pt-24 items-center">

          {/* LEFT SIDE - Terminal UI */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight text-slate-900">
                Crafting Experiences <br />
                <span className="text-rose-500">Beyond Just Code.</span>
              </h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md">
                Don't just read about me. <span className="text-slate-900 font-bold">Hack into my profile</span> and explore the data directly.
              </p>
            </div>
            <Terminal />
          </motion.div>

          {/* RIGHT SIDE - Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-4">
               {/* Quick Stats Bento */}
               <div className="col-span-2 bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group border border-slate-800">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 blur-[60px] rounded-full" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-rose-500 mb-6">Developer Pulse</h3>
                  <div className="grid grid-cols-2 gap-8 relative z-10">
                    <div>
                      <div className="text-3xl font-black text-white"><Counter value={15} />+</div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Projects</p>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-rose-500"><Counter value={10} />+</div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Tech Stack</p>
                    </div>
                  </div>
               </div>

               {/* Interest Bento */}
               <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex flex-col justify-between hover:border-rose-500 transition-all group">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform">⚡</div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm">Real-time</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Socket.io, WebStreams</p>
                  </div>
               </div>

               {/* Focus Bento */}
               <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex flex-col justify-between hover:border-indigo-500 transition-all group">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform">🎯</div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm">Scalable</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Microservices, Cloud</p>
                  </div>
               </div>
            </div>

            {/* Resume Callout Bento */}
            <div 
              onClick={openResume}
              className="bg-rose-50 p-6 rounded-[32px] border border-rose-100 flex items-center justify-between group hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">📂</div>
                <div>
                  <h4 className="text-slate-900 font-black text-sm uppercase tracking-tight">Full Dossier</h4>
                  <p className="text-[10px] text-rose-600 font-bold uppercase tracking-widest">Download Resume</p>
                </div>
              </div>
              <div className="text-rose-500 group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </motion.div>
        </div>

        {/* Compact Contribution Bento Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative z-10 mt-12 grid lg:grid-cols-12 gap-6"
        >
          <div className="lg:col-span-8 bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-slate-900 font-black text-xl tracking-tight uppercase">Contribution Pipeline</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">// Monitoring the github flow</p>
                </div>
                <a href="https://github.com/Yatishydv" target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase text-rose-500 hover:underline underline-offset-4 tracking-widest">Git Profile</a>
              </div>
              <div className="flex-1 flex flex-col gap-6 justify-center">
                <img 
                  src="https://github-readme-stats.vercel.app/api?username=Yatishydv&show_icons=true&theme=rose&bg_color=00000000&border_color=00000000&hide_border=true&title_color=f43f5e&icon_color=f43f5e&text_color=94a3b8" 
                  alt="GitHub Stats" 
                  className="w-full max-w-2xl mx-auto"
                />
                <div className="w-full flex justify-center border-t border-slate-50 pt-6">
                  <img 
                    src="https://ghchart.rshah.org/f43f5e/Yatishydv" 
                    alt="GitHub Heatmap" 
                    className="w-full max-w-3xl opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 flex-1 flex flex-col justify-center items-center text-center group">
               <img 
                 src="https://github-readme-streak-stats.herokuapp.com/?user=Yatishydv&theme=rose&background=00000000&border=00000000&stroke=00000000&ring=f43f5e&fire=f43f5e&currStreakLabel=f43f5e&sideNums=94a3b8&sideLabels=94a3b8&dates=94a3b8"
                 alt="GitHub Streak"
                 className="w-full max-w-[280px] group-hover:scale-105 transition-transform"
               />
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-6 italic">Streak Status: Active</p>
            </div>
            <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 flex-1 flex items-center justify-center group">
               <img 
                 src="https://github-readme-stats.vercel.app/api/top-langs/?username=Yatishydv&layout=compact&theme=rose&bg_color=00000000&border_color=00000000&hide_border=true&title_color=f43f5e&icon_color=f43f5e&text_color=94a3b8" 
                 alt="Top Langs" 
                 className="w-full max-w-[260px] group-hover:rotate-2 transition-transform"
               />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;