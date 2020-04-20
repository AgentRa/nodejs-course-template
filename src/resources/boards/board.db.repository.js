const Board = require('./board.model');

const getAll = async () => await Board.find({});

const getBoardById = async id => await Board.findById(id);

const saveBoard = async board => await Board.create(board);

const updateBoard = async (id, boardInfo) =>
  await Board.updateOne({ _id: id }, boardInfo);

const deleteBoard = async _id => (await Board.deleteOne({ _id })).ok;

module.exports = { getAll, getBoardById, saveBoard, updateBoard, deleteBoard };
