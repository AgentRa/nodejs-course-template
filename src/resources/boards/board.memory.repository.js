const Board = require('./board.model');

const boards = [
  new Board({
    id: '1',
    title: '1st ever board',
    columns: [
      { id: '1', title: 'Backlog', order: 1 },
      { id: '2', title: 'Sprint', order: 2 }
    ]
  }),
  new Board({
    id: '2',
    title: 'Vacation board',
    columns: [
      { id: '111', title: 'Travel to', order: 1 },
      { id: '222', title: 'Bring stuff from', order: 2 }
    ]
  })
];

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
