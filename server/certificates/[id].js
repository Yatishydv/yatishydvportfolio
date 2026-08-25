import { connectDB } from '../_lib/db.js';
import { Certificate } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  try {
    await requireAuth(req);
  } catch (err) {
    return jsonError(res, 'Unauthorized', 401);
  }

  if (req.method === 'GET') {
    const cert = await Certificate.findById(id).lean();
    if (!cert) return jsonError(res, 'Certificate not found', 404);
    return jsonOk(res, { certificate: cert });
  }

  if (req.method === 'PUT') {
    const updates = { ...req.body };
    delete updates._id; delete updates.__v; delete updates.createdAt;
    const cert = await Certificate.findByIdAndUpdate(
      id, { ...updates, updatedAt: new Date() }, { new: true }
    ).lean();
    if (!cert) return jsonError(res, 'Certificate not found', 404);
    return jsonOk(res, { certificate: cert });
  }

  if (req.method === 'DELETE') {
    const cert = await Certificate.findByIdAndDelete(id);
    if (!cert) return jsonError(res, 'Certificate not found', 404);
    return jsonOk(res, { message: 'Certificate deleted' });
  }

  return jsonError(res, 'Method not allowed', 405);
}
