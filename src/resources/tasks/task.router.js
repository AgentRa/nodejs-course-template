const router = require('express').Router({ mergeParams: true });
const {
  OK,
  NO_CONTENT,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED
} = require('http-status-codes');
const {
  getTasksByBoardId,
  getById,
  saveTask,
  updateTask,
  deleteTask
} = require('./task.service');

const catchErrors = require('../../utils/catchErrors');
// Controller Layer

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await getTasksByBoardId(req.params.boardId);
    if (tasks.length) {
      await res.status(OK).json(tasks);
      return;
    }
    await res.status(NOT_FOUND).send({ error: 'Tasks not found' });
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const task = await getById(req.params.id);
    if (task) {
      await res.status(OK).json(task);
      return;
    }
    await res.status(NOT_FOUND).send({ error: 'Task not found' });
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const task = await saveTask(req.body, req.params.boardId);
    await res.status(CREATED).json(task);
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    if (await getById(req.params.id)) {
      await updateTask(req.params.id, req.body);
      await res.status(OK).json(getById(req.params.id));
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
    if (await getById(req.params.id)) {
      await deleteTask(req.params.id);
      await res.status(NO_CONTENT).end();
      return;
    }
    await res
      .status(NOT_FOUND)
      .send({ message: 'Task not found' })
      .end();
  })
);

module.exports = router;
