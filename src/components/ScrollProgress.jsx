import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
      setShowTopBtn(currentScroll > 500);
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-slate-200">
        <motion.div 
          className="h-full bg-rose-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-rose-500 text-white rounded-2xl shadow-2xl z-[60] flex items-center justify-center text-xl hover:bg-rose-400 transition-colors"
          >
            <HiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default ScrollProgress;
