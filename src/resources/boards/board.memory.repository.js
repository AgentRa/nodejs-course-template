const boards = [];

const getAll = () => boards;

const getBoardById = id => boards.find(board => board.id === id);

const saveBoard = board => {
  boards.push(board);
};

const updateBoard = (id, boardInfo) => {
  const board = boards.find(item => item.id === id);
  boards.splice(boards.indexOf(board), 1, { ...board, ...boardInfo });
};

const deleteBoard = id => {
  const board = boards.find(item => item.id === id);
  boards.splice(boards.indexOf(board), 1);
};

module.exports = { getAll, getBoardById, saveBoard, updateBoard, deleteBoard };
