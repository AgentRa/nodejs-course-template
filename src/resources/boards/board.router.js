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
      return res.status(OK).json(boards.map(Board.toResponse));
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const board = new Board(await req.body);
      await saveBoard(board);
      return res.status(OK).json(Board.toResponse(board));
    })
  );

router
  .route('/:id')
  .get(
    validator(id, 'params'),
    catchErrors(async (req, res) => {
      const board = await getBoardById(req.params.id);
      if (board) return res.status(OK).json(Board.toResponse(board));
      return res.status(NOT_FOUND).send({ error: 'Board not found' });
    })
  )
  .put(
    validator(id, 'params'),
    catchErrors(async (req, res) => {
      await updateBoard(req.params.id, req.body);
      return res.status(OK).json(Board.toResponse(getBoardById(req.params.id)));
    })
  )
  .delete(
    validator(id, 'params'),
    catchErrors(async (req, res) => {
      await deleteBoard(req.params.id);
      return res.status(NO_CONTENT).end();
    })
  );

module.exports = router;
