const taskRepo = require('./task.memory.repository');

const getTasksByBoardId = boardId => taskRepo.getTasksByBoardId(boardId);

const getTasksByUserId = userId => taskRepo.getTasksByUserId(userId);

const getById = id => taskRepo.getById(id);

const saveTask = (taskInfo, boardId) => taskRepo.saveTask(taskInfo, boardId);

const updateTask = (id, taskInfo) => taskRepo.updateTask(id, taskInfo);

const deleteTask = id => taskRepo.deleteTask({ id });

module.exports = {
  getTasksByBoardId,
  getById,
  saveTask,
  updateTask,
  deleteTask,
  getTasksByUserId
};
