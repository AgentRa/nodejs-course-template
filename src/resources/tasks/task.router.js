const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT, NOT_FOUND } = require('http-status-codes');
const {
  getTasksByBoardId,
  getById,
  saveTask,
  updateTask,
  deleteTask
} = require('./task.service');

const { taskId } = require('../../utils/validator/schemas');
const validator = require('../../utils/validator/validator');
const catchErrors = require('../../utils/catchErrors');
// Controller Layer

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const tasks = await getTasksByBoardId(req.params.boardId);
      await res.status(OK).json(tasks);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const task = await saveTask(req.body, req.params.boardId);
      await res.status(OK).json(task);
    })
  );

router
  .route('/:id')
  .get(
    validator(taskId, 'params'),
    catchErrors(async (req, res) => {
      const task = await getById(req.params.id);
      res
        .status(task ? OK : NOT_FOUND)
        .json(task ? task : { error: 'Task not found' });
    })
  )
  .put(
    validator(taskId, 'params'),
    catchErrors(async (req, res) => {
      await updateTask(req.params.id, req.body);
      await res.status(OK).json(getById(req.params.id));
    })
  )
  .delete(
    validator(taskId, 'params'),
    catchErrors(async (req, res) => {
      await deleteTask(req.params.id);
      await res.status(NO_CONTENT).end();
    })
  );

module.exports = router;
