import { connectDB } from '../_lib/db.js';
import { Skill } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  try { await requireAuth(req); } catch { return jsonError(res, 'Unauthorized', 401); }

  if (req.method === 'GET') {
    const skill = await Skill.findById(id).lean();
    if (!skill) return jsonError(res, 'Skill not found', 404);
    return jsonOk(res, { skill });
  }

  if (req.method === 'PUT') {
    const updates = { ...req.body };
    delete updates._id; delete updates.__v;
    const skill = await Skill.findByIdAndUpdate(id, updates, { new: true }).lean();
    if (!skill) return jsonError(res, 'Skill not found', 404);
    return jsonOk(res, { skill });
  }

  if (req.method === 'DELETE') {
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return jsonError(res, 'Skill not found', 404);
    return jsonOk(res, { message: 'Skill deleted' });
  }

  return jsonError(res, 'Method not allowed', 405);
}
