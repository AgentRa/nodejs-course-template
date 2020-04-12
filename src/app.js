const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const logger = require('./utils/logger');
const requestLogger = require('./utils/requestLogger');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', requestLogger);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

process
  .on('uncaughtException', err => {
    logger.error(`Uncaught exception: ${err.message}`);
    process.exitCode = 1;
  })
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
  });

// throw Error('Exception!');
// Promise.reject(error('Rejectoon '))

module.exports = app;
