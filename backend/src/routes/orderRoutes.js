const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const orderController = require('../controllers/orderController');
const { protectedRouteLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.post('/', protectedRouteLimiter, authenticate, orderController.create);
router.get('/me', protectedRouteLimiter, authenticate, orderController.listMyOrders);
router.get('/', protectedRouteLimiter, authenticate, authorize('ADMIN'), orderController.listAllOrders);
router.patch('/:id/status', protectedRouteLimiter, authenticate, authorize('ADMIN'), orderController.updateStatus);
router.post('/:id/cancel', protectedRouteLimiter, authenticate, orderController.cancel);
router.post('/:id/refund', protectedRouteLimiter, authenticate, authorize('ADMIN'), orderController.refund);

module.exports = router;
