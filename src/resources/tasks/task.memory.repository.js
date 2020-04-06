const Task = require('./task.model');

const tasks = [];

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

const deleteTask = id => {
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
