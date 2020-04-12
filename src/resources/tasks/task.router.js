const router = require('express').Router({ mergeParams: true });
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
      await res.json(tasks);
      return;
    }
    await res.status(404).send({ error: 'Tasks not found' });
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const task = await getById(req.params.id);
    if (task) {
      await res.json(task);
      return;
    }
    await res.status(404).send({ error: 'Task not found' });
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const task = await saveTask(req.body, req.params.boardId);
    await res.json(task);
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    if (await getById(req.params.id)) {
      await updateTask(req.params.id, req.body);
      await res.json(getById(req.params.id));
      return;
    }
    await res
      .status(400)
      .send({ message: 'Error: you must put existing id' })
      .end();
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (await getById(req.params.id)) {
      await deleteTask(req.params.id);
      await res.status(204).end();
      return;
    }
    await res
      .status(404)
      .send({ message: 'Task not found' })
      .end();
  })
);

module.exports = router;
