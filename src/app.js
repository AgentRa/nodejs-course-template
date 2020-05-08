const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorHandler = require('./middleware/errorHandler');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', loggerMiddleware);

app.use('/login', loginRouter);
app.use('/users', authMiddleware, userRouter);
app.use('/boards', authMiddleware, boardRouter);
boardRouter.use('/:boardId/tasks', authMiddleware, taskRouter);

app.use(errorHandler);

module.exports = app;
