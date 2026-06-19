const express = require('express');
const { z } = require('zod');
const validate = require('../middlewares/validate');
const { authenticate } = require('../middlewares/auth');
const paymentController = require('../controllers/paymentController');
const { protectedRouteLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.post('/create-intent', protectedRouteLimiter, authenticate, validate(z.object({ body: z.object({ amount: z.coerce.number().int().positive(), currency: z.string().optional(), orderId: z.string().optional() }) })), paymentController.createIntent);

module.exports = router;
