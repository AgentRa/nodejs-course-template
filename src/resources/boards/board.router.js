const router = require('express').Router();
const Board = require('./board.model');
const {
  getAll,
  getBoardById,
  deleteBoard,
  saveBoard,
  updateBoard
} = require('./board.service');

// Controller Layer

router.route('/').get(async (req, res) => {
  const boards = await getAll();
  await res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await getBoardById(req.params.id);
  if (board) {
    await res.json(board);
    return;
  }
  res.status(404).send({ error: 'Board not found' });
});

router.route('/').post(async (req, res) => {
  const { title, columns } = await req.body;
  if (!title || !columns) {
    res.status(400).send({ error: 'All fields must be fulfilled' });
    return;
  }
  const board = new Board(await req.body);
  await saveBoard(board);
  await res.json(board);
});

router.route('/:id').put(async (req, res) => {
  if (await getBoardById(req.params.id)) {
    await updateBoard(req.params.id, req.body);
    await res.json(getBoardById(req.params.id));
    return;
  }
  res
    .status(400)
    .send({ message: 'Error: you must put existing id' })
    .end();
});

router.route('/:id').delete(async (req, res) => {
  if (await getBoardById(req.params.id)) {
    await deleteBoard(req.params.id);
    await res.status(204).end();
    return;
  }
  res
    .status(404)
    .send({ message: 'Board not found' })
    .end();
});

module.exports = router;
