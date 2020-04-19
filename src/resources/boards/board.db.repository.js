const Board = require('./board.model');

const getAll = () => Board.find({});

const getBoardById = id => Board.findById(id);

const saveBoard = async board => Board.create(board);

const updateBoard = async (id, boardInfo) =>
  Board.updateOne({ _id: id }, boardInfo);

const deleteBoard = async id =>
  (await Board.deleteOne({ _id: id })).deletedCount;

module.exports = { getAll, getBoardById, saveBoard, updateBoard, deleteBoard };
