const prisma = require("../config/prisma");

/*DASHBOARD STATS/Builds stats from existing tables:/Asset, People, Template, User*/

const getDashboardStats = async () => {

  /*Run all DB queries in parallel for speed*/
  const [
    totalAssets,
    totalPeople,
    totalTemplates,
    totalUsers,
    latestAsset,
    latestPeople,
    assetsByCategory,
    peopleByStatus,
    peopleByWorkStatus,
    peopleByWorkPeriod,
    recentAssets,
    recentPeople,
    assetValueStats,
  ] = await Promise.all([

    // Total counts
    prisma.asset.count(),
    prisma.people.count(),
    prisma.template.count(),
    prisma.user.count(),

    // Last upload timestamps
    prisma.asset.findFirst({
      orderBy: { createdAt: "desc" },
      select:  { createdAt: true, assetName: true }
    }),
    prisma.people.findFirst({
      orderBy: { createdAt: "desc" },
      select:  { createdAt: true, personName: true }
    }),

    // Asset breakdown by category
    prisma.asset.groupBy({
      by:      ["assetCategory"],
      _count:  { id: true },
      orderBy: { _count: { id: "desc" } }
    }),

    // People breakdown by status
    prisma.people.groupBy({
      by:     ["personStatus"],
      _count: { id: true }
    }),

    // People breakdown by work status
    prisma.people.groupBy({
      by:     ["workStatus"],
      _count: { id: true }
    }),

    // People breakdown by work period
    prisma.people.groupBy({
      by:     ["workPeriod"],
      _count: { id: true }
    }),

    // Recent 5 assets
    prisma.asset.findMany({
      orderBy: { createdAt: "desc" },
      take:    5,
      select: {
        id:           true,
        assetName:    true,
        assetCategory:true,
        purchaseValue:true,
        createdAt:    true,
      }
    }),

    // Recent 5 people
    prisma.people.findMany({
      orderBy: { createdAt: "desc" },
      take:    5,
      select: {
        id:           true,
        personName:   true,
        designation:  true,
        workStatus:   true,
        createdAt:    true,
      }
    }),

    // Asset value statistics
    prisma.asset.aggregate({
      _sum: {
        purchaseValue: true,
        currentValue:  true,
        depreciation:  true,
      },
      _avg: {
        purchaseValue: true,
        currentValue:  true,
      },
      _max: { purchaseValue: true },
      _min: { purchaseValue: true },
    }),

  ])

  /*
  |--------------------------------------------------------------------
  | RESPONSE SHAPE
  | Matches dashboard wireframe sections:
  | 1. Data Statistics
  | 2. System Use Statistics
  | 3. Auto AI Statistics (placeholder — tables not built yet)
  |--------------------------------------------------------------------
  */

  return {

    /*DATA STATISTICS/Last upload of each type + counts*/
    dataStats: {
      assets: {
        total:      totalAssets,
        lastUpload: latestAsset?.createdAt  || null,
        lastName:   latestAsset?.assetName  || null,
      },
      people: {
        total:      totalPeople,
        lastUpload: latestPeople?.createdAt  || null,
        lastName:   latestPeople?.personName || null,
      },
      templates: {
        total: totalTemplates,
      },
      users: {
        total: totalUsers,
      },
    },

    /*ASSET ANALYTICS*/
    assetAnalytics: {
      byCategory: assetsByCategory.map(item => ({
        category: item.assetCategory || "Uncategorized",
        count:    item._count.id,
      })),
      valueStats: {
        totalPurchaseValue: assetValueStats._sum.purchaseValue  || 0,
        totalCurrentValue:  assetValueStats._sum.currentValue   || 0,
        totalDepreciation:  assetValueStats._sum.depreciation   || 0,
        avgPurchaseValue:   Math.round(assetValueStats._avg.purchaseValue || 0),
        avgCurrentValue:    Math.round(assetValueStats._avg.currentValue  || 0),
        maxPurchaseValue:   assetValueStats._max.purchaseValue  || 0,
        minPurchaseValue:   assetValueStats._min.purchaseValue  || 0,
      },
      recent: recentAssets,
    },

    /*PEOPLE ANALYTICS*/
    peopleAnalytics: {
      byStatus: peopleByStatus.map(item => ({
        status: item.personStatus,
        count:  item._count.id,
      })),
      byWorkStatus: peopleByWorkStatus.map(item => ({
        workStatus: item.workStatus,
        count:      item._count.id,
      })),
      byWorkPeriod: peopleByWorkPeriod.map(item => ({
        workPeriod: item.workPeriod,
        count:      item._count.id,
      })),
      recent: recentPeople,
    },

    /*SYSTEM USE STATISTICS/Placeholders until Infographics/Presentations/Alarms built*/
    systemStats: {
      presentations: 0,
      infographics:  0,
      reports:       0,
      analysisRuns:  0,
    },

    /*AUTO AI STATISTICS/Placeholders until Alarms table built*/
    autoAiStats: {
      alarms:      0,
      discoveries: 0,
      lastUpdate:  new Date().toISOString(),
    },

    /*META*/
    generatedAt: new Date().toISOString(),
  }
}

module.exports = { getDashboardStats }