import { connectDB } from '../_lib/db.js';
import { Project, Certificate, Skill } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return jsonError(res, 'Method not allowed', 405);
  try {
    await requireAuth(req);
    await connectDB();
    const [totalProjects, publishedProjects, totalCerts, publishedCerts, totalSkills] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Certificate.countDocuments(),
      Certificate.countDocuments({ published: true }),
      Skill.countDocuments({ published: true }),
    ]);
    return jsonOk(res, {
      stats: { totalProjects, publishedProjects, totalCerts, publishedCerts, totalSkills }
    });
  } catch (err) {
    if (err.status === 401) return jsonError(res, 'Unauthorized', 401);
    return jsonError(res, 'Failed to fetch stats', 500);
  }
}
