import { connectDB } from '../_lib/db.js';
import { Project } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

/**
 * GET  /api/projects — public, returns published projects only
 * POST /api/projects — admin only, creates a project
 */
export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const projects = await Project.find({ published: true })
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();
      return jsonOk(res, { projects });
    } catch (err) {
      console.error('GET /api/projects error:', err);
      return jsonError(res, 'Failed to fetch projects', 500);
    }
  }

  if (req.method === 'POST') {
    try {
      await requireAuth(req);
      const { title, shortDescription, fullDescription, imageUrl, liveUrl, githubUrl,
              tech, category, date, featured, displayOrder, published, status, version } = req.body || {};

      if (!title) return jsonError(res, 'Title is required', 400);

      const project = await Project.create({
        title, shortDescription, fullDescription, imageUrl, liveUrl, githubUrl,
        tech: tech || [], category, date, featured: !!featured,
        displayOrder: displayOrder || 0, published: !!published,
        status: status || 'DRAFT', version,
      });

      return jsonOk(res, { project }, 201);
    } catch (err) {
      if (err.status === 401) return jsonError(res, 'Unauthorized', 401);
      console.error('POST /api/projects error:', err);
      return jsonError(res, 'Failed to create project', 500);
    }
  }

  return jsonError(res, 'Method not allowed', 405);
}
