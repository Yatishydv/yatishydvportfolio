import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiAlertOctagon } from "react-icons/fi";

const messages = [
  "Wow, you found a secret page! Just kidding, it's a 404.",
  "Are you lost? Or are you just testing my error handling?",
  "This page is currently on vacation. Please try again never.",
  "I'm a developer, not a magician. This page doesn't exist.",
  "404: The page you are looking for has been abducted by aliens.",
  "You've ventured too far into the matrix. Turn back now.",
  "Congratulations! You broke the internet. (Not really, just this link)",
  "This page is as empty as my coffee cup at 3 AM.",
  "Nothing to see here. Move along, citizen."
];

export default function NotFound() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center font-mono">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-lg"
      >
        <div className="flex justify-center mb-8 text-rose-500">
          <FiAlertOctagon size={80} className="animate-pulse" />
        </div>
        
        <h1 className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 leading-none mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-white mb-6">Page Not Found</h2>
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-2xl">
          <p className="text-slate-400 text-lg leading-relaxed italic">
            "{message}"
          </p>
        </div>

        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-rose-500/25"
        >
          <FiHome size={20} />
          Return to Safety
        </Link>
      </motion.div>
    </div>
  );
}
