import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiFolder, FiAward, FiCode, FiEye, FiMousePointer, FiFileText, FiShare2, FiActivity } from "react-icons/fi";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const StatCard = ({ icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 hover:border-white/20 transition-all group shadow-2xl"
  >
    {/* Background Glow */}
    <div className={`absolute -top-12 -right-12 w-32 h-32 ${color} opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity`} />
    
    <div className="flex items-center gap-5 relative z-10">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 shadow-inner backdrop-blur-md border border-white/10 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-4xl font-black text-white tracking-tight">{value ?? "—"}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [contentStats, setContentStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/analytics", { credentials: "include" }).then((r) => r.json())
    ])
      .then(([contentData, analyticsData]) => {
        setContentStats(contentData.stats);
        setAnalytics(analyticsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            {greeting}, <span className="text-rose-500">Yatish</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">Here is your portfolio's performance overview.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-full">
           <FiActivity className="text-rose-500 animate-pulse" />
           <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Live Sync Active</span>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiEye size={24} className="text-rose-400" />}
          label="Total Views"
          value={loading ? "..." : analytics?.totals?.page_view || 0}
          color="bg-rose-500"
          delay={0.1}
        />
        <StatCard
          icon={<FiMousePointer size={24} className="text-blue-400" />}
          label="Project Clicks"
          value={loading ? "..." : analytics?.totals?.project_click || 0}
          color="bg-blue-500"
          delay={0.15}
        />
        <StatCard
          icon={<FiFileText size={24} className="text-emerald-400" />}
          label="Resume Actions"
          value={loading ? "..." : analytics?.totals?.resume_click || 0}
          color="bg-emerald-500"
          delay={0.2}
        />
        <StatCard
          icon={<FiShare2 size={24} className="text-amber-400" />}
          label="Social Clicks"
          value={loading ? "..." : analytics?.totals?.social_click || 0}
          color="bg-amber-500"
          delay={0.25}
        />
      </div>

      {/* Analytics Graph */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-slate-900/50 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-blue-500/5 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Traffic & Interactions</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Last 7 Days</p>
          </div>
        </div>

        <div className="w-full relative z-10" style={{ height: "350px" }}>
          {!loading && analytics?.chartData && analytics.chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={analytics.chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: '#0f172aa0', backdropFilter: 'blur(16px)', borderColor: '#ffffff20', borderRadius: '16px', color: '#fff', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                />
                <Line type="monotone" name="Views" dataKey="views" stroke="#f43f5e" strokeWidth={4} dot={{ r: 5, fill: "#0f172a", strokeWidth: 3, stroke: "#f43f5e" }} activeDot={{ r: 8, fill: "#f43f5e", strokeWidth: 0 }} />
                <Line type="monotone" name="Clicks" dataKey="clicks" stroke="#3b82f6" strokeWidth={4} dot={{ r: 5, fill: "#0f172a", strokeWidth: 3, stroke: "#3b82f6" }} activeDot={{ r: 8, fill: "#3b82f6", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
               <div className="w-8 h-8 border-4 border-slate-700 border-t-rose-500 rounded-full animate-spin mb-4" />
               <p className="text-xs font-bold uppercase tracking-widest">Loading Analytics...</p>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full" />
          <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest relative z-10">Social Breakdown</h2>
          <div className="space-y-3 relative z-10">
            {loading ? (
              <p className="text-slate-500 text-sm">Loading...</p>
            ) : analytics?.socialBreakdown?.length > 0 ? (
              analytics.socialBreakdown.map(item => (
                <div key={item._id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-slate-300 font-bold capitalize">{item._id}</span>
                  <span className="text-rose-400 font-black bg-rose-500/10 px-4 py-1.5 rounded-full text-sm">{item.count} clicks</span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                 <p className="text-slate-500 font-medium">No social clicks recorded yet.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content Stats (Projects, Skills, etc) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full" />
          <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest relative z-10">Database Status</h2>
          <div className="space-y-3 relative z-10">
            <Link to="/admin/projects" className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center"><FiFolder size={18} /></div>
                <span className="text-slate-200 font-bold">Projects</span>
              </div>
              <span className="text-slate-400 font-medium group-hover:text-blue-400 transition-colors">{contentStats?.totalProjects || 0} Entries</span>
            </Link>
            <Link to="/admin/certificates" className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center"><FiAward size={18} /></div>
                <span className="text-slate-200 font-bold">Certificates</span>
              </div>
              <span className="text-slate-400 font-medium group-hover:text-amber-400 transition-colors">{contentStats?.totalCerts || 0} Entries</span>
            </Link>
            <Link to="/admin/skills" className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-rose-500/50 hover:bg-rose-500/5 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center"><FiCode size={18} /></div>
                <span className="text-slate-200 font-bold">Skills</span>
              </div>
              <span className="text-slate-400 font-medium group-hover:text-rose-400 transition-colors">{contentStats?.totalSkills || 0} Entries</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
