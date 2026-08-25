import { connectDB } from '../_lib/db.js';
import { Skill } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

/**
 * GET  /api/skills — public, published only, grouped by category
 * POST /api/skills — admin only
 */
export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const skills = await Skill.find({ published: true })
        .sort({ category: 1, displayOrder: 1 })
        .lean();
      
      // Group by category for the frontend projector display
      const grouped = skills.reduce((acc, skill) => {
        const cat = skill.category;
        if (!acc[cat]) acc[cat] = { category: cat, skills: [] };
        acc[cat].skills.push({
          name: skill.name,
          color: skill.color,
          iconName: skill.iconName,
          _id: skill._id,
        });
        return acc;
      }, {});

      return jsonOk(res, {
        skills,
        skillGroups: Object.values(grouped)
      });
    } catch (err) {
      return jsonError(res, 'Failed to fetch skills', 500);
    }
  }

  if (req.method === 'POST') {
    try {
      await requireAuth(req);
      const { name, category, color, iconName, displayOrder, published } = req.body || {};
      if (!name || !category) return jsonError(res, 'Name and category are required', 400);
      const skill = await Skill.create({ name, category, color, iconName, displayOrder: displayOrder || 0, published: published !== false });
      return jsonOk(res, { skill }, 201);
    } catch (err) {
      if (err.status === 401) return jsonError(res, 'Unauthorized', 401);
      return jsonError(res, 'Failed to create skill', 500);
    }
  }

  return jsonError(res, 'Method not allowed', 405);
}
