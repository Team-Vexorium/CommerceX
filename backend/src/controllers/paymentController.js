const stripe = require('../config/stripe');

const paymentController = {
  createIntent: async (req, res, next) => {
    try {
      if (!stripe) {
        return res.status(503).json({ message: 'Stripe is not configured' });
      }

      const intent = await stripe.paymentIntents.create({
        amount: req.validated.body.amount,
        currency: req.validated.body.currency || 'usd',
        metadata: { orderId: req.validated.body.orderId || '' }
      });

      return res.status(200).json({ clientSecret: intent.client_secret });
    } catch (error) {
      return next(error);
    }
  }
};

module.exports = paymentController;
