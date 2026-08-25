/**
 * Seed script — Run once to populate MongoDB with your existing portfolio data.
 * 
 * Usage:
 *   1. Create a .env file with MONGODB_URI set
 *   2. Run: node scripts/seed.js
 */

import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set in .env file');
  process.exit(1);
}

// ── Schemas (inline for self-contained script) ─────────────────────────────
const projectSchema = new mongoose.Schema({
  title: String, shortDescription: String, fullDescription: String,
  imageUrl: String, liveUrl: String, githubUrl: String,
  tech: [String], category: String, date: String,
  featured: Boolean, displayOrder: Number, published: Boolean,
  status: String, version: String,
}, { timestamps: true });

const certificateSchema = new mongoose.Schema({
  name: String, issuer: String, description: String, date: String,
  credentialId: String, credentialUrl: String, imageUrl: String,
  pdfUrl: String, skills: [String], displayOrder: Number, published: Boolean,
  color: String, gradientFrom: String, gradientTo: String, bgClass: String,
  span: String, iconName: String,
}, { timestamps: true });

const skillSchema = new mongoose.Schema({
  name: String, category: String, color: String, iconName: String,
  displayOrder: Number, published: Boolean,
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);
const Skill = mongoose.model('Skill', skillSchema);

// ── Seed Data — Your existing portfolio content ────────────────────────────
const projects = [
  {
    title: 'Foodzy — Online Food Ordering Platform',
    shortDescription: 'Full-stack platform with AI chatbot (Gemini API) and 3D features using THREE.js. Features 40% engagement boost and responsive cart system.',
    imageUrl: '/foodzy.png',
    liveUrl: 'https://foodzy-eat.vercel.app/',
    githubUrl: 'https://github.com/Yatishydv/Foodzy',
    tech: ['React', 'JS', 'Firebase', 'Tailwind', 'THREE.js'],
    category: 'React',
    date: 'Nov 2025',
    featured: true,
    displayOrder: 1,
    published: true,
    status: 'PRODUCTION',
    version: 'Nov 2025',
  },
  {
    title: 'Blink — Real-Time Video Chat',
    shortDescription: 'Anonymous 1-to-1 video chat app using WebRTC and Socket.IO. Low-latency signaling and privacy-focused design (no login required).',
    imageUrl: '/blink.png',
    liveUrl: 'https://blink-video-chat-app.onrender.com/',
    githubUrl: 'https://github.com/Yatishydv/Blink-video-chat-app',
    tech: ['WebRTC', 'Node.js', 'Socket.IO', 'Express', 'JS'],
    category: 'WebRTC',
    date: 'Jan 2026',
    featured: false,
    displayOrder: 2,
    published: true,
    status: 'STABLE',
    version: 'Jan 2026',
  },
  {
    title: 'Yatish | Professional Portfolio',
    shortDescription: 'Advanced developer portfolio featuring immersive terminal-style UI, 3D carousel, and cinematic skills projection. Optimized for cross-device performance.',
    imageUrl: '/portfolio.png',
    liveUrl: 'https://yatishydvportfolio.vercel.app/',
    githubUrl: 'https://github.com/Yatishydv/yatishydvportfolio',
    tech: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
    category: 'React',
    date: 'v1.0.0',
    featured: false,
    displayOrder: 3,
    published: true,
    status: 'LIVE',
    version: 'v1.0.0',
  },
  {
    title: 'FreshMart — MERN Dev',
    shortDescription: 'Full-stack inventory system research. Comprehensive exploration of atomic database updates and JWT security layers.',
    imageUrl: '/freshmart.png',
    liveUrl: '#',
    githubUrl: 'https://github.com/Yatishydv/onlinegrosystem',
    tech: ['React', 'Express', 'MongoDB', 'JWT'],
    category: 'Node.js',
    date: 'v3.2.0',
    featured: false,
    displayOrder: 4,
    published: true,
    status: 'STABLE',
    version: 'v3.2.0',
  },
  {
    title: 'ColabX — Entrepreneur Platform',
    shortDescription: 'Connecting 300+ entrepreneurs to schemes. Features secure PHP/MySQL login and multi-tenant infrastructure.',
    imageUrl: '/colabx.png',
    liveUrl: '#',
    githubUrl: 'https://github.com/Yatishydv/ColabX',
    tech: ['HTML', 'CSS', 'JS', 'PHP', 'MySQL'],
    category: 'PHP',
    date: 'Apr 2025',
    featured: false,
    displayOrder: 5,
    published: true,
    status: 'LEGACY',
    version: 'Apr 2025',
  },
];

const certificates = [
  {
    name: 'Oracle Data Platform 2025 Certified Foundations Associate',
    issuer: 'Oracle University',
    imageUrl: '/1.png',
    date: 'Mar 2026',
    credentialId: 'ORCL-FND-2025',
    span: 'md:col-span-2',
    color: '#f80000',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-orange-500',
    bgClass: 'bg-red-50/30',
    iconName: 'SiOracle',
    displayOrder: 1,
    published: true,
  },
  {
    name: 'Master Generative AI & Generative AI tools (ChatGPT & more)',
    issuer: 'Udemy',
    imageUrl: '/2.png',
    date: 'Aug 2025',
    credentialId: 'UD-GEN-0825',
    color: '#4285f4',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-emerald-500',
    bgClass: 'bg-blue-50/30',
    iconName: 'SiGooglecloud',
    displayOrder: 2,
    published: true,
  },
  {
    name: 'TCP/IP and Advanced Networking Topics',
    issuer: 'Coursera',
    imageUrl: '/3.png',
    date: 'Nov 2024',
    credentialId: 'CR-TCP-1124',
    color: '#0056D2',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-cyan-500',
    bgClass: 'bg-indigo-50/30',
    iconName: 'FaAward',
    displayOrder: 3,
    published: true,
  },
  {
    name: 'Computer Networking — Bits & Bytes',
    issuer: 'Coursera',
    imageUrl: '/4.png',
    date: 'Sep 2024',
    credentialId: 'CR-NET-0924',
    color: '#0056D2',
    gradientFrom: 'from-blue-700',
    gradientTo: 'to-indigo-500',
    bgClass: 'bg-slate-50/30',
    iconName: 'FaAward',
    displayOrder: 4,
    published: true,
  },
  {
    name: 'Hardware and Operating Systems',
    issuer: 'Coursera',
    imageUrl: '/5.png',
    date: 'Sep 2024',
    credentialId: 'CR-HW-0924',
    color: '#777BB4',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-fuchsia-500',
    bgClass: 'bg-purple-50/30',
    iconName: 'FaAward',
    displayOrder: 5,
    published: true,
  },
];

const skills = [
  // Programming Languages
  { name: 'JavaScript', category: 'Programming Languages', color: '#F7DF1E', iconName: 'FaJs', displayOrder: 1, published: true },
  { name: 'Python', category: 'Programming Languages', color: '#3776AB', iconName: 'FaPython', displayOrder: 2, published: true },
  { name: 'C / C++', category: 'Programming Languages', color: '#00599C', iconName: 'FaCode', displayOrder: 3, published: true },
  { name: 'Java', category: 'Programming Languages', color: '#007396', iconName: 'FaJava', displayOrder: 4, published: true },
  { name: 'PHP', category: 'Programming Languages', color: '#777BB4', iconName: 'FaPhp', displayOrder: 5, published: true },
  // Frontend Engineering
  { name: 'React.js', category: 'Frontend Engineering', color: '#61DAFB', iconName: 'FaReact', displayOrder: 1, published: true },
  { name: 'Tailwind', category: 'Frontend Engineering', color: '#06B6D4', iconName: 'SiTailwindcss', displayOrder: 2, published: true },
  { name: 'TypeScript', category: 'Frontend Engineering', color: '#3178C6', iconName: 'SiTypescript', displayOrder: 3, published: true },
  { name: 'UI/UX Design', category: 'Frontend Engineering', color: '#10B981', iconName: 'FaLightbulb', displayOrder: 4, published: true },
  // Backend & Systems
  { name: 'Node.js', category: 'Backend & Systems', color: '#339933', iconName: 'FaNodeJs', displayOrder: 1, published: true },
  { name: 'Laravel', category: 'Backend & Systems', color: '#FF2D20', iconName: 'SiLaravel', displayOrder: 2, published: true },
  { name: 'Firebase', category: 'Backend & Systems', color: '#FFCA28', iconName: 'SiFirebase', displayOrder: 3, published: true },
  { name: 'Database', category: 'Backend & Systems', color: '#4479A1', iconName: 'FaDatabase', displayOrder: 4, published: true },
  // Soft Skills & Focus
  { name: 'Leadership', category: 'Soft Skills & Focus', color: '#6366F1', iconName: 'FaUsers', displayOrder: 1, published: true },
  { name: 'Critical Thinking', category: 'Soft Skills & Focus', color: '#F59E0B', iconName: 'FaBrain', displayOrder: 2, published: true },
  { name: 'Full Stack', category: 'Soft Skills & Focus', color: '#F43F5E', iconName: 'FaGear', displayOrder: 3, published: true },
];

// ── Run ─────────────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Certificate.deleteMany({}),
      Skill.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    await Project.insertMany(projects);
    console.log(`✅ Inserted ${projects.length} projects`);

    await Certificate.insertMany(certificates);
    console.log(`✅ Inserted ${certificates.length} certificates`);

    await Skill.insertMany(skills);
    console.log(`✅ Inserted ${skills.length} skills`);

    console.log('\n🎉 Seed complete! Your portfolio data is now in MongoDB.');
    console.log('You can now add PromptKar and new certificates from the Admin Dashboard.\n');

  } catch (err) {
    console.error('❌ Seed failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
