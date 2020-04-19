const boardsRepo = require('./board.db.repository');
const { getTasksByBoardId, deleteTask } = require('../tasks/task.service');

const getAll = async () => await boardsRepo.getAll();

const getBoardById = async id => await boardsRepo.getBoardById(id);

const saveBoard = async board => await boardsRepo.saveBoard(board);

const updateBoard = async (id, boardInfo) =>
  await boardsRepo.updateBoard(id, boardInfo);

const deleteBoard = async boardId => {
  await getTasksByBoardId(boardId).forEach(({ id }) => deleteTask(id));
  await boardsRepo.deleteBoard(boardId);
};

module.exports = { getAll, getBoardById, saveBoard, updateBoard, deleteBoard };
