const stripe = require('../config/stripe');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await handlePaymentSuccess(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      await handlePaymentFailure(failedIntent);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
};

const handlePaymentSuccess = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;
  if (!orderId) return;

  const payment = await prisma.payment.findUnique({ where: { stripePaymentIntentId: paymentIntent.id } });
  
  if (payment && payment.status !== 'SUCCEEDED') {
    await prisma.$transaction(async (tx) => {
      // Update Payment status
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: 'SUCCEEDED', paidAt: new Date() }
      });

      // Update Order status
      const order = await tx.order.update({
        where: { id: payment.orderId },
        data: { status: 'PROCESSING' },
        include: { items: true }
      });

      // Deduct inventory
      for (const item of order.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } }
          });
        } else {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } }
          });
        }

        await tx.inventoryLog.create({
          data: {
            productId: item.productId,
            variantId: item.variantId,
            action: 'ORDER_PLACED',
            quantity: -item.quantity,
            reason: `Order ${order.orderNumber} paid`
          }
        });
      }
    });
  }
};

const handlePaymentFailure = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;
  if (!orderId) return;

  await prisma.payment.updateMany({
    where: { stripePaymentIntentId: paymentIntent.id },
    data: { status: 'FAILED' }
  });
};

module.exports = {
  handleStripeWebhook
};
