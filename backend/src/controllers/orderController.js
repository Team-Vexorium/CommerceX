const { PrismaClient } = require('@prisma/client');
const stripe = require('../config/stripe');
const prisma = new PrismaClient();

const orderController = {
  create: async (_req, res) => res.status(201).json({ message: 'Order created' }),
  listMyOrders: async (_req, res) => res.status(200).json({ data: [] }),
  listAllOrders: async (_req, res) => res.status(200).json({ data: [] }),
  updateStatus: async (_req, res) => res.status(200).json({ message: 'Order status updated' }),
  cancel: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await prisma.order.findUnique({ where: { id }, include: { items: true, payment: true } });
      if (!order) return res.status(404).json({ message: 'Order not found' });
      
      if (order.status !== 'PENDING') {
        return res.status(400).json({ message: 'Only PENDING orders can be cancelled' });
      }

      await prisma.order.update({ where: { id }, data: { status: 'CANCELLED' } });
      res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
      next(error);
    }
  },
  refund: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await prisma.order.findUnique({ where: { id }, include: { items: true, payment: true } });
      
      if (!order) return res.status(404).json({ message: 'Order not found' });
      
      if (order.status !== 'PROCESSING' && order.status !== 'SHIPPED' && order.status !== 'DELIVERED') {
         return res.status(400).json({ message: 'Order cannot be refunded' });
      }

      // Restore inventory
      await prisma.$transaction(async (tx) => {
        for (const item of order.items) {
          if (item.variantId) {
            await tx.productVariant.update({
              where: { id: item.variantId },
              data: { stock: { increment: item.quantity } }
            });
          } else {
            await tx.product.update({
              where: { id: item.productId },
              data: { stock: { increment: item.quantity } }
            });
          }

          await tx.inventoryLog.create({
            data: {
              productId: item.productId,
              variantId: item.variantId,
              action: 'REFUND',
              quantity: item.quantity,
              reason: `Order ${order.orderNumber} refunded`
            }
          });
        }

        await tx.order.update({ where: { id }, data: { status: 'REFUNDED' } });
        if (order.payment) {
          await tx.payment.update({ where: { id: order.payment.id }, data: { status: 'REFUNDED' } });
        }
      });

      // Initiate Stripe refund if payment succeeded
      if (order.payment && order.payment.stripePaymentIntentId && order.payment.status === 'SUCCEEDED') {
        if (stripe) {
          await stripe.refunds.create({
            payment_intent: order.payment.stripePaymentIntentId
          });
        }
      }

      res.json({ message: 'Order refunded successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = orderController;
