import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
  const [step, setStep] = useState("email"); // 'email' | 'otp'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const cooldownRef = useRef(null);

  // Check if already logged in
  useEffect(() => {
    fetch("/api/auth/check", { credentials: "include" }).then((res) => {
      if (res.ok) navigate("/admin/dashboard", { replace: true });
    });
  }, [navigate]);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (cooldown > 0) {
      cooldownRef.current = setTimeout(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearTimeout(cooldownRef.current);
  }, [cooldown]);

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (loading || cooldown > 0) return;
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP. Please try again.");
      } else {
        setStep("otp");
        setMessage("Check your email for the verification code.");
        setCooldown(60); // 60 second resend cooldown
        setOtp(["", "", "", "", "", ""]);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto-advance to next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && otp.every((d) => d)) {
      handleVerifyOtp();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      setTimeout(() => otpRefs.current[5]?.focus(), 50);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp: otpString }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        setTimeout(() => otpRefs.current[0]?.focus(), 50);
      } else {
        navigate("/admin/dashboard", { replace: true });
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-10 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em]">Admin Access</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              YatishKumar<span className="text-rose-500">.site</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 font-medium">
              {step === "email" ? "Secure admin dashboard access" : "Enter the verification code"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Email */}
            {step === "email" && (
              <motion.form
                key="email-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendOtp}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="your@email.com"
                    required
                    autoFocus
                    className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 rounded-2xl px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition-all text-sm font-medium"
                  />
                </div>

                {error && (
                  <p className="text-rose-400 text-xs font-medium bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-500/20 disabled:shadow-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : "Send OTP"}
                </motion.button>

                <p className="text-center text-xs text-slate-500 font-medium">
                  Only the configured admin email can receive an OTP.
                </p>
              </motion.form>
            )}

            {/* STEP 2: OTP */}
            {step === "otp" && (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {message && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <p className="text-emerald-400 text-xs font-medium">{message}</p>
                  </div>
                )}

                {/* 6-digit OTP input */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
                    Verification Code
                  </label>
                  <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (otpRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-12 h-14 text-center text-xl font-black text-white bg-slate-800 border-2 border-slate-700 focus:border-rose-500 rounded-xl outline-none transition-all"
                        style={{ caretColor: 'transparent' }}
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-rose-400 text-xs font-medium bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 text-center">
                    {error}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.some((d) => !d)}
                  className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-500/20 disabled:shadow-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : "Verify OTP"}
                </motion.button>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => { setStep("email"); setError(""); setMessage(""); }}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-medium"
                  >
                    ← Use different email
                  </button>
                  <button
                    onClick={handleSendOtp}
                    disabled={cooldown > 0 || loading}
                    className="text-xs font-bold text-rose-400 hover:text-rose-300 disabled:text-slate-500 transition-colors"
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-600 mt-6 font-medium">
          Private access only · <a href="/" className="hover:text-slate-400 transition-colors">← Back to portfolio</a>
        </p>
      </motion.div>
    </div>
  );
}
