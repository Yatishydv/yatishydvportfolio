import crypto from 'crypto';
import { connectDB } from './db.js';
import { AdminSession } from './models.js';

/**
 * Parse cookies from request header string
 */
export function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    cookies[key] = decodeURIComponent(value);
  });
  return cookies;
}

/**
 * Build a Set-Cookie header string
 */
export function buildCookieHeader(name, value, options = {}) {
  let cookie = `${name}=${encodeURIComponent(value)}`;
  if (options.httpOnly) cookie += '; HttpOnly';
  if (options.secure) cookie += '; Secure';
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`;
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`;
  if (options.path) cookie += `; Path=${options.path}`;
  return cookie;
}

/**
 * Middleware: verify admin session from cookie.
 * Returns the session document if valid, throws 401 if not.
 */
export async function requireAuth(req) {
  await connectDB();
  const cookies = parseCookies(req.headers.cookie);
  const sessionToken = cookies['admin_session'];

  if (!sessionToken) {
    const err = new Error('No session token');
    err.status = 401;
    throw err;
  }

  // Hash the token to compare with stored hash
  const tokenHash = crypto.createHash('sha256').update(sessionToken).digest('hex');
  const session = await AdminSession.findOne({
    tokenHash,
    expiresAt: { $gt: new Date() }
  });

  if (!session) {
    const err = new Error('Session invalid or expired');
    err.status = 401;
    throw err;
  }

  return session;
}

/**
 * CORS + JSON headers for all API responses
 */
export function setCorsHeaders(res, req) {
  const origin = req?.headers?.origin || '';
  // Only allow same origin in production
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Standard JSON response helpers
 */
export function jsonOk(res, data, statusCode = 200) {
  res.setHeader('Content-Type', 'application/json');
  res.status(statusCode).json({ success: true, ...data });
}

export function jsonError(res, message, statusCode = 500) {
  res.setHeader('Content-Type', 'application/json');
  res.status(statusCode).json({ success: false, error: message });
}

/**
 * Get real IP from Vercel request (handles proxies)
 */
export function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}
