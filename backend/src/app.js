const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const securityMiddlewares = require('./middlewares/security');
const { issueCsrfToken, verifyCsrfToken } = require('./middlewares/csrf');
const errorHandler = require('./middlewares/errorHandler');

const webhookRoutes = require('./routes/webhookRoutes');

const app = express();

securityMiddlewares.forEach((middleware) => app.use(middleware));

// Webhook routes must be defined before express.json() to get the raw body
app.use('/api/v1/webhooks', webhookRoutes);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(issueCsrfToken);
app.use(verifyCsrfToken);

app.use('/api/v1', routes);

app.use(errorHandler);

module.exports = app;
