import express from 'express';
import authSendOtp from '../server/auth/send-otp.js';
import authVerifyOtp from '../server/auth/verify-otp.js';
import authCheck from '../server/auth/check.js';
import authLogout from '../server/auth/logout.js';

import projectsIndex from '../server/projects/index.js';
import projectsId from '../server/projects/[id].js';
import certificatesIndex from '../server/certificates/index.js';
import certificatesId from '../server/certificates/[id].js';
import skillsIndex from '../server/skills/index.js';
import skillsId from '../server/skills/[id].js';
import profileIndex from '../server/profile/index.js';

import adminProjects from '../server/admin/projects.js';
import adminCertificates from '../server/admin/certificates.js';
import adminStats from '../server/admin/stats.js';

import analyticsIndex from '../server/analytics/index.js';

import imageProxy from '../server/image-proxy.js';

const app = express();
app.use(express.json());

// Helper to simulate Vercel serverless request/response signatures
const wrap = (handler) => async (req, res) => {
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

export default app;
