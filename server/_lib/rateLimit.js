import { connectDB } from './db.js';
import { RateLimit } from './models.js';

/**
 * Check rate limit for an IP+action combination.
 * @param {string} ip - Client IP address
 * @param {string} action - The action being rate-limited (e.g., 'send-otp', 'verify-otp')
 * @param {number} maxRequests - Maximum requests allowed in the window
 * @param {number} windowMs - Window duration in milliseconds
 * @returns {Promise<{allowed: boolean, remaining: number}>}
 */
export async function checkRateLimit(ip, action, maxRequests, windowMs) {
  await connectDB();

  const windowStart = new Date(Date.now() - windowMs);

  const count = await RateLimit.countDocuments({
    ipAddress: ip,
    action,
    createdAt: { $gt: windowStart }
  });

  if (count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  // Log this attempt
  await RateLimit.create({ ipAddress: ip, action });

  return { allowed: true, remaining: maxRequests - count - 1 };
}
