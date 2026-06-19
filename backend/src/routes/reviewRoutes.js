const express = require('express');
const { authenticate } = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController');
const { protectedRouteLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.get('/product/:productId', reviewController.listByProduct);
router.post('/product/:productId', protectedRouteLimiter, authenticate, reviewController.create);

module.exports = router;
