import { connectDB } from '../_lib/db.js';
import { Certificate } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return jsonError(res, 'Method not allowed', 405);
  try {
    await requireAuth(req);
    await connectDB();
    const certificates = await Certificate.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean();
    return jsonOk(res, { certificates });
  } catch (err) {
    if (err.status === 401) return jsonError(res, 'Unauthorized', 401);
    return jsonError(res, 'Failed to fetch certificates', 500);
  }
}
