const { finished } = require('stream');
const logger = require('../utils/logger');

const loggerMiddleware = (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  const { method, url, body, query } = req;
  const start = Date.now(); // process.hrtime

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.info(
      `Method: ${method}, URL: ${decodeURI(
        url
      )}, query object: ${JSON.stringify(
        query
      )}, request body: ${JSON.stringify(body)} ${statusCode} [${ms}ms]`
    );
  });

  next();
};

module.exports = loggerMiddleware;
