const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

// Note: Stripe requires the raw body to construct the event
router.post('/stripe', express.raw({ type: 'application/json' }), webhookController.handleStripeWebhook);

module.exports = router;
