const Task = require('./task.model');

const tasks = [
  {
    id: '11111',
    title: 'PAUL',
    order: 'SEAN',
    description: 'he is a man',
    userId: '1',
    boardId: '1',
    columnId: '111'
  },
  {
    id: '22222',
    title: 'ANDR',
    order: 'SOM',
    description: 'he is a fish',
    userId: '2',
    boardId: '2',
    columnId: '333'
  },
  {
    id: '33333',
    title: 'Bruce',
    order: 'Lee',
    description: 'monstro',
    userId: '3',
    boardId: '1',
    columnId: '222'
  }
];

const getTasksByBoardId = boardId =>
  tasks.filter(task => task.boardId === boardId);

const getTasksByUserId = userId => tasks.filter(task => task.userId === userId);

const getById = id => tasks.find(task => task.id === id);

const saveTask = (taskInfo, boardId) => {
  const task = new Task({ ...taskInfo, boardId });
  tasks.push(task);
  return task;
};

const updateTask = (id, taskInfo) => {
  const task = tasks.find(item => item.id === id);
  tasks.splice(tasks.indexOf(task), 1, { ...task, ...taskInfo });
};

const deleteTask = ({ id }) => {
  const task = tasks.find(item => item.id === id);
  tasks.splice(tasks.indexOf(task), 1);
};

module.exports = {
  getTasksByBoardId,
  getById,
  saveTask,
  updateTask,
  deleteTask,
  getTasksByUserId
};
