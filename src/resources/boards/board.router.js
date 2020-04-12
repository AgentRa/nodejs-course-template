const router = require('express').Router();
const {
  OK,
  NO_CONTENT,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED
} = require('http-status-codes');
const Board = require('./board.model');
const {
  getAll,
  getBoardById,
  deleteBoard,
  saveBoard,
  updateBoard
} = require('./board.service');

const catchErrors = require('../../utils/catchErrors');

// Controller Layer

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await getAll();
    await res.status(OK).json(boards);
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await getBoardById(req.params.id);
    if (board) {
      await res.status(OK).json(board);
      return;
    }
    await res.status(NOT_FOUND).send({ error: 'Board not found' });
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { title, columns } = await req.body;
    if (!title || !columns) {
      res.status(BAD_REQUEST).send({ error: 'All fields must be fulfilled' });
      return;
    }
    const board = new Board(await req.body);
    await saveBoard(board);
    await res.status(CREATED).json(board);
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    if (await getBoardById(req.params.id)) {
      await updateBoard(req.params.id, req.body);
      await res.status(OK).json(getBoardById(req.params.id));
      return;
    }
    await res
      .status(BAD_REQUEST)
      .send({ message: 'Error: you must put existing id' })
      .end();
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (await getBoardById(req.params.id)) {
      await deleteBoard(req.params.id);
      await res.status(NO_CONTENT).end();
      return;
    }
    await res
      .status(NOT_FOUND)
      .send({ message: 'Board not found' })
      .end();
  })
);

module.exports = router;
