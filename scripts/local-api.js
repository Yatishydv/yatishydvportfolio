import 'dotenv/config';
import express from 'express';
import { resolve, join } from 'path';

// Import all API handlers manually since we are not using a dynamic importer for simplicity
import authSendOtp from '../api/auth/send-otp.js';
import authVerifyOtp from '../api/auth/verify-otp.js';
import authCheck from '../api/auth/check.js';
import authLogout from '../api/auth/logout.js';

import projectsIndex from '../api/projects/index.js';
import projectsId from '../api/projects/[id].js';
import certificatesIndex from '../api/certificates/index.js';
import certificatesId from '../api/certificates/[id].js';
import skillsIndex from '../api/skills/index.js';
import skillsId from '../api/skills/[id].js';
import profileIndex from '../api/profile/index.js';

import adminProjects from '../api/admin/projects.js';
import adminCertificates from '../api/admin/certificates.js';
import adminStats from '../api/admin/stats.js';

import analyticsIndex from '../api/analytics/index.js';

import imageProxy from '../api/image-proxy.js';

const app = express();
app.use(express.json());

// Helper to simulate Vercel serverless request/response signatures
const wrap = (handler) => async (req, res) => {
  // Vercel parses cookies, Express doesn't by default (unless cookie-parser is used),
  // but our API code manually parses `req.headers.cookie` anyway, so it's fine!
  // Vercel req.query is automatically populated by Express
  try {
    await handler(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const injectParams = (req) => {
  const proxy = Object.create(req);
  Object.defineProperty(proxy, 'query', {
    value: { ...req.query, ...req.params },
    enumerable: true,
    writable: true,
    configurable: true
  });
  return proxy;
};

// Map routes
app.all('/api/auth/send-otp', wrap(authSendOtp));
app.all('/api/auth/verify-otp', wrap(authVerifyOtp));
app.all('/api/auth/check', wrap(authCheck));
app.all('/api/auth/logout', wrap(authLogout));

app.all('/api/projects', wrap(projectsIndex));
app.all('/api/projects/:id', (req, res) => wrap(projectsId)(injectParams(req), res));

app.all('/api/certificates', wrap(certificatesIndex));
app.all('/api/certificates/:id', (req, res) => wrap(certificatesId)(injectParams(req), res));

app.all('/api/skills', wrap(skillsIndex));
app.all('/api/skills/:id', (req, res) => wrap(skillsId)(injectParams(req), res));

app.all('/api/profile', wrap(profileIndex));

app.all('/api/image-proxy', wrap(imageProxy));

app.all('/api/admin/projects', wrap(adminProjects));
app.all('/api/admin/certificates', wrap(adminCertificates));
app.all('/api/admin/stats', wrap(adminStats));

app.all('/api/analytics', wrap(analyticsIndex));

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`The Vite frontend proxy is connected to this port.`);
});

server.on('error', (e) => {
  console.error('Server error:', e);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Force keep-alive
setInterval(() => {}, 1000 * 60 * 60);

