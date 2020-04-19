const router = require('express').Router();
const User = require('./user.model');
const validator = require('../../utils/validator/validator');
const { id, user } = require('../../utils/validator/schemas');
const { OK, NO_CONTENT } = require('http-status-codes');
const {
  getAll,
  getUserById,
  deleteUser,
  saveUser,
  updateUser
} = require('./user.service');

const catchErrors = require('../../utils/catchErrors');

// Controller Layer

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const users = await getAll();
      await res.status(OK).json(users.map(User.toResponse));
    })
  )
  .post(
    validator(user, 'body'),
    catchErrors(async (req, res) => {
      const newUser = new User(await req.body);
      await saveUser(newUser);
      await res.status(OK).json(User.toResponse(newUser));
    })
  );

router
  .route('/:id')
  .get(
    validator(id, 'params'),
    catchErrors(async (req, res) => {
      const reqUser = await getUserById(req.params.id);
      res.status(OK).json(User.toResponse(reqUser));
    })
  )
  .put(
    validator(id, 'params'),
    validator(user, 'body'),
    catchErrors(async (req, res) => {
      await updateUser(req.params.id, req.body);
      res.status(OK).json(User.toResponse(getUserById(req.params.id)));
    })
  )
  .delete(
    validator(id, 'params'),
    catchErrors(async (req, res) => {
      await deleteUser(req.params.id);
      res.status(NO_CONTENT).end();
    })
  );

module.exports = router;
