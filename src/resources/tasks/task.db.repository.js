const Task = require('./task.model');

const getTasksByBoardId = async boardId => await Task.find({ boardId });

const getTasksByUserId = async userId => await Task.find({ userId });

const getById = async id => await Task.findById(id);

const saveTask = async (taskInfo, boardId) =>
  await Task.create({ ...taskInfo, boardId });

const removeUserId = async userId =>
  (await Task.updateMany({ userId }, { userId: null })).ok;

const updateTask = async (_id, taskInfo) =>
  await Task.updateOne({ _id }, taskInfo);

const deleteTask = async ({ id }) => (await Task.deleteOne({ _id: id })).ok;

const deleteTasksByBoardId = async boardId =>
  (await Task.deleteMany({ boardId })).ok;

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
