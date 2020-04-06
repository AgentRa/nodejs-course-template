const router = require('express').Router({ mergeParams: true });
const {
  getTasksByBoardId,
  getById,
  saveTask,
  updateTask,
  deleteTask
} = require('./task.service');

// Controller Layer

router.route('/').get(async (req, res) => {
  const tasks = await getTasksByBoardId(req.params.boardId);
  if (tasks) {
    await res.json(tasks);
    return;
  }
  res.status(404).send({ error: 'Tasks not found' });
});

router.route('/:id').get(async (req, res) => {
  const task = await getById(req.params.id);
  if (task) {
    await res.json(task);
    return;
  }
  res.status(404).send({ error: 'Task not found' });
});

router.route('/').post(async (req, res) => {
  const task = await saveTask(req.body, req.params.boardId);
  await res.json(task);
});

router.route('/:id').put(async (req, res) => {
  if (await getById(req.params.id)) {
    await updateTask(req.params.id, req.body);
    await res.json(getById(req.params.id));
    return;
  }
  res
    .status(400)
    .send({ message: 'Error: you must put existing id' })
    .end();
});

router.route('/:id').delete(async (req, res) => {
  if (await getById(req.params.id)) {
    await deleteTask(req.params.id);
    await res.status(204).end();
    return;
  }
  res
    .status(404)
    .send({ message: 'Task not found' })
    .end();
});

module.exports = router;
