const adminController = {
  dashboard: async (_req, res) => {
    return res.status(200).json({
      metrics: {
        revenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0
      },
      charts: {
        salesByMonth: [],
        topProducts: []
      }
    });
  }
};

module.exports = adminController;
