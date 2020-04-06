const boards = [
  {
    id: '1',
    title: 'Test Board number 1',
    columns: [
      {
        id: '111',
        title: 'Sana',
        order: 'qweqwe'
      },
      {
        id: '222',
        title: 'Sana',
        order: 'qweqwe'
      }
    ]
  },
  {
    id: '2',
    title: 'Test Board number 2',
    columns: [
      {
        id: '333',
        title: 'vacation',
        order: 'winter'
      },
      {
        id: '444',
        title: 'vacation',
        order: 'summer'
      }
    ]
  },
  {
    id: 'dd738cfsdfsdf9-b578-4d34-989e-227dcd9483b6e',
    title: 'John',
    columns: [
      {
        id: '447e73b2-e93d-44ccssds0b-bs587-cxvxcv0480149cba8e',
        title: 'Pavel',
        order: 'sdxcsdsd'
      },
      {
        id: '447e73b2-e93d-xx4sdfsdfv4xcxc0b-bs58sds7-0480149cba8e',
        title: 'Pavel',
        order: 'sdsdxcsd'
      }
    ]
  }
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
