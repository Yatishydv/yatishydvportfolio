import crypto from 'crypto';
import { connectDB } from '../_lib/db.js';
import { OtpSession, AdminSession } from '../_lib/models.js';
import { checkRateLimit } from '../_lib/rateLimit.js';
import { jsonOk, jsonError, getClientIp, buildCookieHeader } from '../_lib/auth.js';

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_OTP_ATTEMPTS = 5;

/**
 * POST /api/auth/verify-otp
 * 
 * Body: { otp: string }
 * 
 * Security:
 * - Rate limited: 10 attempts per IP per 15 minutes
 * - Verifies SHA-256 hash (OTP never stored plaintext)
 * - Checks 5-minute expiry
 * - Max 5 incorrect attempts before lockout
 * - Single-use: marks OTP as used immediately on success
 * - Session token: cryptographically random, stored as SHA-256 hash
 * - Sets HttpOnly, Secure, SameSite=Strict cookie
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return jsonError(res, 'Method not allowed', 405);
  }

  const ip = getClientIp(req);

  // Rate limit: 10 verify attempts per IP per 15 minutes
  const rateCheck = await checkRateLimit(ip, 'verify-otp', 10, 15 * 60 * 1000);
  if (!rateCheck.allowed) {
    return jsonError(res, 'Too many verification attempts. Please wait before trying again.', 429);
  }

  const { otp } = req.body || {};

  if (!otp || typeof otp !== 'string' || !/^\d{6}$/.test(otp.trim())) {
    return jsonError(res, 'Invalid verification code format.', 400);
  }

  try {
    await connectDB();

    // Find the latest unused, unexpired OTP session
    const session = await OtpSession.findOne({
      used: false,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!session) {
      return jsonError(res, 'Verification code has expired or is invalid. Please request a new code.', 401);
    }

    // Check if max attempts exceeded
    if (session.attempts >= MAX_OTP_ATTEMPTS) {
      await OtpSession.findByIdAndUpdate(session._id, { used: true });
      return jsonError(res, 'Too many incorrect attempts. Please request a new code.', 401);
    }

    // Hash the submitted OTP with the stored salt and compare
    const submittedHash = crypto.createHash('sha256')
      .update(otp.trim() + session.otpSalt)
      .digest('hex');

    // Constant-time comparison
    const storedHashBuffer = Buffer.from(session.otpHash, 'hex');
    const submittedHashBuffer = Buffer.from(submittedHash, 'hex');

    let isCorrect = false;
    if (storedHashBuffer.length === submittedHashBuffer.length) {
      isCorrect = crypto.timingSafeEqual(storedHashBuffer, submittedHashBuffer);
    }

    if (!isCorrect) {
      // Increment attempts
      await OtpSession.findByIdAndUpdate(session._id, { $inc: { attempts: 1 } });
      const remaining = MAX_OTP_ATTEMPTS - session.attempts - 1;
      return jsonError(
        res,
        remaining > 0
          ? `Invalid verification code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
          : 'Invalid verification code. No more attempts. Please request a new code.',
        401
      );
    }

    // OTP is correct — mark as used (single-use enforcement)
    await OtpSession.findByIdAndUpdate(session._id, { used: true });

    // Create authenticated session
    const rawToken = crypto.randomBytes(48).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    await AdminSession.create({ tokenHash, expiresAt });

    // Set secure HttpOnly cookie
    const isProduction = process.env.NODE_ENV === 'production';
    const cookie = buildCookieHeader('admin_session', rawToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'Strict',
      maxAge: SESSION_DURATION_MS / 1000,
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
    return jsonOk(res, { message: 'Authentication successful', redirectTo: '/admin/dashboard' });

  } catch (err) {
    console.error('verify-otp error:', err);
    return jsonError(res, 'Verification failed. Please try again.', 500);
  }
}
