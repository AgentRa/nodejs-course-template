const boardsRepo = require('./board.memory.repository');
const { getTasksByBoardId, deleteTask } = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getBoardById = id => boardsRepo.getBoardById(id);

const saveBoard = board => boardsRepo.saveBoard(board);

const updateBoard = (id, boardInfo) => boardsRepo.updateBoard(id, boardInfo);

const deleteBoard = async id => {
  await getTasksByBoardId(id).forEach(deleteTask);
  boardsRepo.deleteBoard(id);
};

module.exports = { getAll, getBoardById, saveBoard, updateBoard, deleteBoard };
