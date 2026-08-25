import { connectDB } from '../_lib/db.js';
import { Project } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

/**
 * GET /api/admin/projects — admin only, returns ALL projects including drafts
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') return jsonError(res, 'Method not allowed', 405);
  try {
    await requireAuth(req);
    await connectDB();
    const projects = await Project.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean();
    return jsonOk(res, { projects });
  } catch (err) {
    if (err.status === 401) return jsonError(res, 'Unauthorized', 401);
    return jsonError(res, 'Failed to fetch projects', 500);
  }
}
