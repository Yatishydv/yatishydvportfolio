import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

/**
 * GET /api/auth/check
 * 
 * Returns 200 if the session cookie is valid, 401 if not.
 * Used by the frontend ProtectedRoute component to verify auth state.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return jsonError(res, 'Method not allowed', 405);
  }

  try {
    await requireAuth(req);
    return jsonOk(res, { authenticated: true });
  } catch (err) {
    if (err.status === 401) {
      return jsonError(res, 'Not authenticated', 401);
    }
    console.error('auth check error:', err);
    return jsonError(res, 'Server error', 500);
  }
}
