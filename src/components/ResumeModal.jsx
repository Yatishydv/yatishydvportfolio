import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiDownload } from "react-icons/hi";

function ResumeModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 backdrop-blur-md bg-slate-900/40"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl h-[90vh] rounded-[40px] shadow-3xl overflow-hidden flex flex-col bg-white border border-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                  <span className="font-black text-xs">CV</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    Curriculum Vitae
                  </h3>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-0.5">Yatish Kumar</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download
                  className="hidden md:flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all shadow-lg bg-slate-900 text-white hover:bg-rose-500"
                >
                  <HiDownload size={18} />
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg bg-slate-100 text-slate-900 hover:bg-rose-500 hover:text-white"
                >
                  <HiX size={24} />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div className="flex-grow overflow-hidden relative bg-slate-50">
              <iframe
                src="/resume.pdf#view=FitH"
                className="w-full h-full border-none"
                title="Resume Preview"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="text-slate-500 font-medium mb-4">Your browser doesn't support PDF previews.</p>
                  <a 
                    href="/resume.pdf" 
                    download 
                    className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-500/20"
                  >
                    Download Resume PDF
                  </a>
                </div>
              </iframe>
              
              {/* Mobile Download FAB */}
              <div className="md:hidden absolute bottom-8 right-8">
                <a
                  href="/resume.pdf"
                  download
                  className="w-14 h-14 bg-rose-500 text-white rounded-2xl shadow-2xl flex items-center justify-center animate-bounce"
                >
                  <HiDownload size={24} />
                </a>
              </div>
            </div>
            
            {/* Footer for mobile info */}
            <div className="p-4 text-center md:hidden border-t border-slate-100">
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                 Tap the icon to download PDF
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ResumeModal;
