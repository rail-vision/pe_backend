const dashboardService = require("../services/dashboard.service");

/*
|--------------------------------------------------------------------------
| GET DASHBOARD STATS
| GET /api/dashboard/stats
| Protected Route
|--------------------------------------------------------------------------
*/

const getDashboardStats = async (req, res, next) => {

  try {

    const stats =
      await dashboardService.getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (err) {

    next(err);

  }

};

module.exports = {
  getDashboardStats
};