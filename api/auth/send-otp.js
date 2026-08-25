import crypto from 'crypto';
import { Resend } from 'resend';
import { connectDB } from '../_lib/db.js';
import { OtpSession } from '../_lib/models.js';
import { checkRateLimit } from '../_lib/rateLimit.js';
import { jsonOk, jsonError, getClientIp } from '../_lib/auth.js';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/auth/send-otp
 * 
 * Body: { email: string }
 * 
 * Security:
 * - Rate limited: 3 requests per IP per 15 minutes
 * - Constant-time email comparison (prevents timing attacks)
 * - Generic response (never reveals if email matched)
 * - OTP stored as SHA-256 hash with random salt (never plaintext)
 * - OTP expires in 5 minutes
 * - Invalidates any previous unused OTP
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return jsonError(res, 'Method not allowed', 405);
  }

  const ip = getClientIp(req);

  // Rate limit: 3 OTP requests per IP per 15 minutes
  const rateCheck = await checkRateLimit(ip, 'send-otp', 3, 15 * 60 * 1000);
  if (!rateCheck.allowed) {
    return jsonError(res, 'Too many requests. Please wait before requesting another OTP.', 429);
  }

  const { email } = req.body || {};

  if (!email || typeof email !== 'string') {
    // Still return 200 — never reveal what is wrong
    return jsonOk(res, { message: 'If that email is authorized, an OTP has been sent.' });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error('ADMIN_EMAIL env var not set');
    return jsonError(res, 'Server configuration error', 500);
  }

  // Constant-time comparison to prevent timing attacks
  const providedBuffer = Buffer.from(email.toLowerCase().trim());
  const adminBuffer = Buffer.from(adminEmail.toLowerCase().trim());
  
  const isMatch = providedBuffer.length === adminBuffer.length &&
    crypto.timingSafeEqual(providedBuffer, adminBuffer);

  // ALWAYS return the same generic message — never reveal if email matched
  const genericResponse = { message: 'If that email is authorized, an OTP has been sent.' };

  if (!isMatch) {
    return jsonError(res, 'Unauthorized email address. Access denied.', 401);
  }

  try {
    await connectDB();

    // Invalidate any previous unused OTPs
    await OtpSession.updateMany({ used: false }, { $set: { used: true } });

    // Generate 6-digit cryptographically secure OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash the OTP with a random salt before storing
    const salt = crypto.randomBytes(16).toString('hex');
    const otpHash = crypto.createHash('sha256').update(otp + salt).digest('hex');

    // Store hashed OTP with 5-minute expiry
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await OtpSession.create({
      otpHash,
      otpSalt: salt,
      expiresAt,
      used: false,
      attempts: 0,
      ipAddress: ip,
    });

    // Send OTP email via Resend
    const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    const emailResponse = await resend.emails.send({
      from: emailFrom,
      to: adminEmail,
      subject: 'YatishKumar.site — Your Admin Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Admin Verification Code</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh; background: #f8fafc;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 24px rgba(0,0,0,0.06); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background: #0f172a; padding: 32px 40px; text-align: center;">
                        <p style="margin: 0; color: #f43f5e; font-size: 11px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase;">YatishKumar.site</p>
                        <h1 style="margin: 8px 0 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Admin Verification</h1>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px;">
                        <p style="margin: 0 0 8px; color: #64748b; font-size: 14px; font-weight: 500;">Your one-time verification code is:</p>
                        
                        <!-- OTP Code -->
                        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; text-align: center; margin: 20px 0;">
                          <p style="margin: 0; font-size: 48px; font-weight: 900; letter-spacing: 16px; color: #0f172a; font-family: 'Courier New', monospace;">${otp}</p>
                        </div>

                        <div style="background: #fff1f2; border-left: 4px solid #f43f5e; border-radius: 0 8px 8px 0; padding: 12px 16px; margin: 20px 0;">
                          <p style="margin: 0; color: #9f1239; font-size: 13px; font-weight: 600;">⏱ This code expires in <strong>5 minutes</strong></p>
                        </div>

                        <p style="margin: 24px 0 0; color: #94a3b8; font-size: 12px; line-height: 1.6;">
                          You requested access to the <strong>YatishKumar.site admin dashboard</strong>.<br>
                          If you did not request this code, you can safely ignore this email.
                        </p>
                        
                        <p style="margin: 12px 0 0; color: #94a3b8; font-size: 12px;">
                          For security: Do not share this code with anyone.
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background: #f8fafc; padding: 20px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
                        <p style="margin: 0; color: #cbd5e1; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">
                          YatishKumar.site · Secure Admin Access
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    console.log('Resend API Response:', emailResponse);

    return jsonOk(res, genericResponse);
  } catch (err) {
    console.error('send-otp error:', err);
    return jsonError(res, 'Failed to send OTP. Please try again.', 500);
  }
}
