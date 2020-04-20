const taskRepo = require('./task.db.repository');

const getTasksByBoardId = async boardId =>
  await taskRepo.getTasksByBoardId(boardId);

const getTasksByUserId = async userId =>
  await taskRepo.getTasksByUserId(userId);

const getById = async id => {
  const task = await taskRepo.getById(id);
  console.log('ГЕТ БАЙ АЙДИ', task);
  return task;
};

const saveTask = async (taskInfo, boardId) =>
  await taskRepo.saveTask(taskInfo, boardId);

const updateTask = async (id, taskInfo) =>
  await taskRepo.updateTask(id, taskInfo);

const deleteTask = async id => await taskRepo.deleteTask({ id });

const deleteTasksByBoardId = boardId => taskRepo.deleteTasksByBoardId(boardId);

const removeUserId = async userId => await taskRepo.removeUserId(userId);

module.exports = {
  getTasksByBoardId,
  getById,
  saveTask,
  updateTask,
  deleteTask,
  getTasksByUserId,
  removeUserId,
  deleteTasksByBoardId
};
