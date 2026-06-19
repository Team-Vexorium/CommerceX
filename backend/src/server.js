const app = require('./app');
const env = require('./config/env');

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`CommerceX API listening on port ${env.PORT}`);
});
