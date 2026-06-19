const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const env = require('../config/env');

const securityMiddlewares = [
  helmet(),
  cors({
    origin: env.FRONTEND_URL,
    credentials: true
  }),
  compression(),
  cookieParser(),
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
];

module.exports = securityMiddlewares;
