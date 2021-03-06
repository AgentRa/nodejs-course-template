const { connectToDB } = require('./db/db.client');
const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./utils/logger');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

process
  .on('uncaughtException', err => {
    logger.error(`Uncaught exception: ${err.message}`);
    process.exitCode = 1;
  })
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection: ${reason.message}`);
    process.exitCode = 1;
  });
