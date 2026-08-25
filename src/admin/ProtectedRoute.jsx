import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // 'checking' | 'authed' | 'unauthed'
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/auth/check", { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          setStatus("authed");
        } else {
          setStatus("unauthed");
          navigate("/admin", { replace: true });
        }
      })
      .catch(() => {
        setStatus("unauthed");
        navigate("/admin", { replace: true });
      });
  }, [navigate]);

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-mono">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthed") return null;

  return children;
}
