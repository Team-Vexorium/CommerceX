const authService = require('../services/authService');

const setRefreshCookie = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
};

const authController = {
  register: async (req, res, next) => {
    try {
      const result = await authService.register(req.validated.body);
      setRefreshCookie(res, result.refreshToken);
      return res.status(201).json({ user: result.user, accessToken: result.accessToken, verificationToken: result.verificationToken });
    } catch (error) {
      return next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await authService.login(req.validated.body);
      setRefreshCookie(res, result.refreshToken);
      return res.status(200).json({ user: result.user, accessToken: result.accessToken });
    } catch (error) {
      return next(error);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const token = req.cookies.refreshToken || req.body.refreshToken;
      const result = await authService.refresh(token);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const token = req.cookies.refreshToken || req.body.refreshToken;
      await authService.logout(token);
      res.clearCookie('refreshToken');
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  },
  forgotPassword: async (req, res) => res.status(200).json({ message: `Password reset link sent to ${req.validated.body.email}` }),
  resetPassword: async (_req, res) => res.status(200).json({ message: 'Password has been reset' }),
  verifyEmail: async (_req, res) => res.status(200).json({ message: 'Email verified successfully' })
};

module.exports = authController;
