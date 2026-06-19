const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');
const { protectedRouteLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.get('/dashboard', protectedRouteLimiter, authenticate, authorize('ADMIN'), adminController.dashboard);

module.exports = router;
