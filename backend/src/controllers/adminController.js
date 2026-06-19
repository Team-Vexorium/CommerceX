const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const adminController = {
  dashboard: async (_req, res, next) => {
    try {
      const [totalOrders, totalCustomers, totalProducts, revenueAgg] = await Promise.all([
        prisma.order.count(),
        prisma.user.count({ where: { role: 'CUSTOMER' } }),
        prisma.product.count(),
        prisma.order.aggregate({
          _sum: { totalAmount: true },
          where: { status: { in: ['DELIVERED', 'SHIPPED', 'PROCESSING', 'SUCCEEDED'] } }
        })
      ]);

      const revenue = revenueAgg._sum.totalAmount || 0;

      return res.status(200).json({
        metrics: {
          revenue: Number(revenue),
          totalOrders,
          totalCustomers,
          totalProducts
        },
        charts: {
          salesByMonth: [],
          topProducts: []
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = adminController;
