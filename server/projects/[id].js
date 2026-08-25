import { connectDB } from '../_lib/db.js';
import { Project } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

/**
 * GET    /api/projects/[id] — admin only (returns even drafts)
 * PUT    /api/projects/[id] — admin only, update project
 * DELETE /api/projects/[id] — admin only, delete project
 */
export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // All operations here require auth
  try {
    await requireAuth(req);
  } catch (err) {
    return jsonError(res, 'Unauthorized', 401);
  }

  if (req.method === 'GET') {
    try {
      const project = await Project.findById(id).lean();
      if (!project) return jsonError(res, 'Project not found', 404);
      return jsonOk(res, { project });
    } catch (err) {
      console.error(`GET /api/projects/${id} error:`, err);
      return jsonError(res, 'Failed to fetch project', 500);
    }
  }

  if (req.method === 'PUT') {
    try {
      const updates = req.body || {};
      // Remove read-only fields
      delete updates._id;
      delete updates.__v;
      delete updates.createdAt;

      const project = await Project.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).lean();

      if (!project) return jsonError(res, 'Project not found', 404);
      return jsonOk(res, { project });
    } catch (err) {
      console.error(`PUT /api/projects/${id} error:`, err);
      return jsonError(res, 'Failed to update project', 500);
    }
  }

  if (req.method === 'DELETE') {
    try {
      console.log('Attempting to delete project with ID:', id);
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        console.log('Project not found for ID:', id);
        return jsonError(res, 'Project not found', 404);
      }
      console.log('Successfully deleted project:', id);
      return jsonOk(res, { message: 'Project deleted successfully' });
    } catch (err) {
      console.error(`DELETE /api/projects/${id} error:`, err);
      return jsonError(res, 'Failed to delete project', 500);
    }
  }

  return jsonError(res, 'Method not allowed', 405);
}
