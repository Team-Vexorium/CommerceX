const express = require('express');
const { z } = require('zod');
const validate = require('../middlewares/validate');
const authController = require('../controllers/authController');
const { authRateLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1)
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
});

router.post('/register', authRateLimiter, validate(registerSchema), authController.register);
router.post('/login', authRateLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authRateLimiter, authController.refresh);
router.post('/logout', authRateLimiter, authController.logout);
router.post('/forgot-password', authRateLimiter, validate(z.object({ body: z.object({ email: z.string().email() }) })), authController.forgotPassword);
router.post('/reset-password', authRateLimiter, validate(z.object({ body: z.object({ token: z.string(), password: z.string().min(8) }) })), authController.resetPassword);
router.post('/verify-email', authRateLimiter, validate(z.object({ body: z.object({ token: z.string() }) })), authController.verifyEmail);

module.exports = router;
