import { connectDB } from '../_lib/db.js';
import { AnalyticsEvent } from '../_lib/models.js';
import { requireAuth, jsonOk, jsonError } from '../_lib/auth.js';

export default async function handler(req, res) {
  await connectDB();

  // POST /api/analytics - Record a new event (Public)
  if (req.method === 'POST') {
    try {
      const { eventType, eventData, path } = req.body || {};
      
      if (!eventType) {
        return jsonError(res, 'eventType is required', 400);
      }

      await AnalyticsEvent.create({
        eventType,
        eventData,
        path,
        userAgent: req.headers['user-agent'],
        ipAddress: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown',
      });

      return jsonOk(res, { success: true }, 201);
    } catch (err) {
      console.error('POST /api/analytics error:', err);
      return jsonError(res, 'Failed to record event', 500);
    }
  }

  // GET /api/analytics - Retrieve aggregated stats for Dashboard (Admin Only)
  if (req.method === 'GET') {
    try {
      await requireAuth(req); // Only admins can see the dashboard

      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Aggregating general totals
      const totals = await AnalyticsEvent.aggregate([
        {
          $group: {
            _id: "$eventType",
            count: { $sum: 1 }
          }
        }
      ]);

      // Detailed breakdown for social clicks
      const socialBreakdown = await AnalyticsEvent.aggregate([
        { $match: { eventType: 'social_click' } },
        {
          $group: {
            _id: "$eventData",
            count: { $sum: 1 }
          }
        }
      ]);

      // Daily time-series data for the last 7 days (for the chart)
      const dailyStats = await AnalyticsEvent.aggregate([
        {
          $match: {
            createdAt: { $gte: oneWeekAgo }
          }
        },
        {
          $group: {
            _id: {
              date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              type: "$eventType"
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.date": 1 }
        }
      ]);

      // Format totals into a key-value map
      const totalsMap = {};
      totals.forEach(t => { totalsMap[t._id] = t.count; });

      // Format daily stats into a chart-friendly format
      const chartDataMap = {};
      
      // Initialize last 7 days
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = d.toISOString().split('T')[0];
        chartDataMap[dateStr] = {
          date: dateStr,
          views: 0,
          clicks: 0,
        };
      }

      dailyStats.forEach(stat => {
        const dateStr = stat._id.date;
        if (chartDataMap[dateStr]) {
          if (stat._id.type === 'page_view') {
            chartDataMap[dateStr].views += stat.count;
          } else {
            // Count all other interaction events as 'clicks'
            chartDataMap[dateStr].clicks += stat.count;
          }
        }
      });

      const chartData = Object.values(chartDataMap);

      return jsonOk(res, { 
        totals: totalsMap,
        socialBreakdown,
        chartData
      });
    } catch (err) {
      if (err.status === 401) return jsonError(res, 'Unauthorized', 401);
      console.error('GET /api/analytics error:', err);
      return jsonError(res, 'Failed to fetch analytics', 500);
    }
  }

  return jsonError(res, 'Method not allowed', 405);
}
