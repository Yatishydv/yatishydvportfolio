import { connectDB } from '../_lib/db.js';
import { Profile } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      let profile = await Profile.findOne().lean();
      if (!profile) {
        // Create default profile on first request
        profile = await Profile.create({});
      }
      return jsonOk(res, { profile });
    } catch (err) {
      return jsonError(res, 'Failed to fetch profile', 500);
    }
  }

  if (req.method === 'PUT') {
    try {
      await requireAuth(req);
      const updates = { ...req.body };
      delete updates._id; delete updates.__v;
      let profile = await Profile.findOneAndUpdate({}, updates, { new: true, upsert: true }).lean();
      return jsonOk(res, { profile });
    } catch (err) {
      if (err.status === 401) return jsonError(res, 'Unauthorized', 401);
      return jsonError(res, 'Failed to update profile', 500);
    }
  }

  return jsonError(res, 'Method not allowed', 405);
}
