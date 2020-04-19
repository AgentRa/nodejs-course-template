const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const users = [
  new User({ name: 'user1', login: 'admin', password: 'admin' }),
  new User({ name: 'user2', login: 'login2', password: 'password222' }),
  new User({
    _id: '85992098-3355-4ef4-82bb-ead06fbfd43b',
    name: 'userWithTask',
    login: 'odmenMolodec'
  })
];

const boards = [
  new Board({
    _id: 'e63cc3c9-528b-4c29-88f5-7f98dcac73d9',
    title: 'summer',
    columns: [{ title: 'get a job', order: 1 }]
  }),
  new Board({ title: 'autumn', columns: [{ title: 'get a job2', order: 2 }] })
];

const tasks = [
  new Task({
    boardId: 'e63cc3c9-528b-4c29-88f5-7f98dcac73d9',
    userId: '85992098-3355-4ef4-82bb-ead06fbfd43b',
    title: 'NodeJS',
    description: 'learn some NNNode'
  }),
  new Task({
    boardId: 'e63cc3c9-528b-4c29-88f5-7f98dcac73d9',
    userId: '85992098-3355-4ef4-82bb-ead06fbfd43b',
    title: 'Express',
    description: 'learn some express'
  })
];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    db.dropDatabase();
    console.log('we are connected!');
    setTimeout(() => {
      users.forEach(user => user.save());
      boards.forEach(board => board.save());
      tasks.forEach(task => task.save());
      cb();
    }, 1500);
  });
};

module.exports = { connectToDB };
