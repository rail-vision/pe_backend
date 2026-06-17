const dashboardService = require("../services/dashboard.service");

/*GET DASHBOARD STATS/GET /api/dashboard/stats/Protected — requires JWT token*/
const getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats()

    res.status(200).json({
      success: true,
      data:    stats
    })

  } catch (err) {
    console.error("[getDashboardStats]", err.message)
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { getDashboardStats }