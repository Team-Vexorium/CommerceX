const crypto = require('crypto');
const HttpError = require('../utils/httpError');

const COOKIE_KEY = 'csrf-token';

const issueCsrfToken = (req, res, next) => {
  const token = crypto.randomBytes(32).toString('hex');
  res.cookie(COOKIE_KEY, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  res.locals.csrfToken = token;
  next();
};

const verifyCsrfToken = (req, _res, next) => {
  if (req.method === 'GET') {
    return next();
  }

  const headerToken = req.headers['x-csrf-token'];
  const cookieToken = req.cookies[COOKIE_KEY];

  if (!headerToken || !cookieToken || headerToken !== cookieToken) {
    return next(new HttpError(403, 'Invalid CSRF token'));
  }

  return next();
};

module.exports = {
  issueCsrfToken,
  verifyCsrfToken,
  COOKIE_KEY
};
