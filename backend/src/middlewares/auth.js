const { verifyAccessToken } = require('../utils/tokens');
const HttpError = require('../utils/httpError');

const authenticate = (req, _res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new HttpError(401, 'Unauthorized'));
  }

  try {
    req.user = verifyAccessToken(token);
    return next();
  } catch {
    return next(new HttpError(401, 'Invalid token'));
  }
};

const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new HttpError(403, 'Forbidden'));
  }

  return next();
};

module.exports = {
  authenticate,
  authorize
};
