const router = require('express').Router();
const { OK, NO_CONTENT, NOT_FOUND } = require('http-status-codes');
const Board = require('./board.model');
const {
  getAll,
  getBoardById,
  deleteBoard,
  saveBoard,
  updateBoard
} = require('./board.service');

const { id } = require('../../utils/validator/schemas');
const validator = require('../../utils/validator/validator');
const catchErrors = require('../../utils/catchErrors');

// Controller Layer

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boards = await getAll();
      await res.status(OK).json(boards);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const board = new Board(await req.body);
      await saveBoard(board);
      await res.status(OK).json(board);
    })
  );

router
  .route('/:id')
  .get(
    validator(id, 'params'),
    catchErrors(async (req, res) => {
      const board = await getBoardById(req.params.id);
      if (board) await res.status(OK).json(board);
      await res.status(NOT_FOUND).send({ error: 'Board not found' });
    })
  )
  .put(
    validator(id, 'params'),
    catchErrors(async (req, res) => {
      await updateBoard(req.params.id, req.body);
      await res.status(OK).json(getBoardById(req.params.id));
    })
  )
  .delete(
    validator(id, 'params'),
    catchErrors(async (req, res) => {
      await deleteBoard(req.params.id);
      await res.status(NO_CONTENT).end();
    })
  );

module.exports = router;
