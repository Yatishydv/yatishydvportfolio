import { connectDB } from '../_lib/db.js';
import { Certificate } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

/**
 * GET  /api/certificates — public, published only
 * POST /api/certificates — admin only
 */
export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const certificates = await Certificate.find({ published: true })
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();
      return jsonOk(res, { certificates });
    } catch (err) {
      return jsonError(res, 'Failed to fetch certificates', 500);
    }
  }

  if (req.method === 'POST') {
    try {
      await requireAuth(req);
      const data = req.body || {};
      if (!data.name) return jsonError(res, 'Name is required', 400);
      const certificate = await Certificate.create({
        ...data,
        skills: data.skills || [],
        displayOrder: data.displayOrder || 0,
        published: !!data.published,
      });
      return jsonOk(res, { certificate }, 201);
    } catch (err) {
      if (err.status === 401) return jsonError(res, 'Unauthorized', 401);
      return jsonError(res, 'Failed to create certificate', 500);
    }
  }

  return jsonError(res, 'Method not allowed', 405);
}
