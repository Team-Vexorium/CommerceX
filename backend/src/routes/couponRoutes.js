const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const couponController = require('../controllers/couponController');
const { protectedRouteLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.get('/', protectedRouteLimiter, authenticate, authorize('ADMIN'), couponController.list);
router.post('/', protectedRouteLimiter, authenticate, authorize('ADMIN'), couponController.create);
router.post('/validate', protectedRouteLimiter, couponController.validate);

module.exports = router;
