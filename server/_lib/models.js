import mongoose from 'mongoose';

// OTP Session Schema
const otpSessionSchema = new mongoose.Schema({
  otpHash: { type: String, required: true },
  otpSalt: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  attempts: { type: Number, default: 0 },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now }
});
otpSessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 }); // Auto-delete after 10 min

// Admin Session Schema
const adminSessionSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});
adminSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired sessions

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  fullDescription: { type: String },
  imageUrl: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String },
  tech: { type: [String], default: [] },
  category: { type: String },
  date: { type: String },
  featured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  published: { type: Boolean, default: false },
  status: { type: String, default: 'DRAFT' },
  version: { type: String },
}, { timestamps: true });

// Certificate Schema
const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String },
  description: { type: String },
  date: { type: String },
  credentialId: { type: String },
  credentialUrl: { type: String },
  imageUrl: { type: String },
  pdfUrl: { type: String },
  skills: { type: [String], default: [] },
  displayOrder: { type: Number, default: 0 },
  published: { type: Boolean, default: false },
  color: { type: String, default: '#f43f5e' },
  gradientFrom: { type: String },
  gradientTo: { type: String },
  bgClass: { type: String },
  span: { type: String, default: 'col-span-1' },
  iconName: { type: String },
}, { timestamps: true });

// Skill Schema
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String, default: '#f43f5e' },
  iconName: { type: String },
  displayOrder: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

// Profile Schema (singleton)
const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Yatish Kumar' },
  title: { type: String, default: 'Full Stack Developer' },
  bio: { type: String },
  profileImageUrl: { type: String },
  profileImagePosition: { type: String, default: 'center' },
  faviconUrl: { type: String },
  cgpa: { type: String, default: '7.67' },
  githubUrl: { type: String, default: 'https://github.com/yatishydv' },
  linkedinUrl: { type: String, default: 'https://www.linkedin.com/in/yatishydv' },
  instagramUrl: { type: String, default: 'https://instagram.com/yatishydv' },
  email: { type: String, default: 'yatish0155@gmail.com' },
  phone: { type: String },
  resumeUrl: { type: String },
}, { timestamps: true });

// Rate Limit Schema
const rateLimitSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  action: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
rateLimitSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 }); // Auto-delete after 15 min
rateLimitSchema.index({ ipAddress: 1, action: 1 });

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  eventType: { type: String, required: true }, // e.g., 'page_view', 'resume_click', 'social_click', 'project_click'
  eventData: { type: String }, // e.g., 'github', 'linkedin', 'project-id-123'
  path: { type: String }, // e.g., '/', '/about'
  userAgent: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now }
});
analyticsSchema.index({ eventType: 1, createdAt: -1 });

// Export models (handle hot-reload in dev)
export const OtpSession = mongoose.models.OtpSession || mongoose.model('OtpSession', otpSessionSchema);
export const AdminSession = mongoose.models.AdminSession || mongoose.model('AdminSession', adminSessionSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);
export const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
export const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
export const RateLimit = mongoose.models.RateLimit || mongoose.model('RateLimit', rateLimitSchema);
export const AnalyticsEvent = mongoose.models.AnalyticsEvent || mongoose.model('AnalyticsEvent', analyticsSchema);
