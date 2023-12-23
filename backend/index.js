const logger = require('./util/logger');
const { PORT } = require('./util/config');
const app = require('./app');

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}...`);
});
