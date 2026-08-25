import crypto from 'crypto';
import { connectDB } from '../_lib/db.js';
import { AdminSession } from '../_lib/models.js';
import { parseCookies, buildCookieHeader, jsonOk, jsonError } from '../_lib/auth.js';

/**
 * POST /api/auth/logout
 * 
 * Invalidates the current session by:
 * 1. Removing the session from MongoDB
 * 2. Clearing the session cookie
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return jsonError(res, 'Method not allowed', 405);
  }

  try {
    await connectDB();
    const cookies = parseCookies(req.headers.cookie);
    const sessionToken = cookies['admin_session'];

    if (sessionToken) {
      const tokenHash = crypto.createHash('sha256').update(sessionToken).digest('hex');
      await AdminSession.deleteOne({ tokenHash });
    }

    // Clear the cookie by setting Max-Age=0
    const clearCookie = buildCookieHeader('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 0,
      path: '/',
    });

    res.setHeader('Set-Cookie', clearCookie);
    return jsonOk(res, { message: 'Logged out successfully' });

  } catch (err) {
    console.error('logout error:', err);
    return jsonError(res, 'Logout failed', 500);
  }
}
