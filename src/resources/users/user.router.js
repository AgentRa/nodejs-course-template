const router = require('express').Router();
const {
  OK,
  NO_CONTENT,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED
} = require('http-status-codes');
const User = require('./user.model');
const {
  getAll,
  getUserById,
  deleteUser,
  saveUser,
  updateUser
} = require('./user.service');

const catchErrors = require('../../utils/catchErrors');

// Controller Layer

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await getAll();
    await res.status(OK).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const user = await getUserById(req.params.id);
    if (user) {
      await res.status(OK).json(User.toResponse(user));
      return;
    }
    await res.status(NOT_FOUND).send({ error: 'User not found' });
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { name, login, password } = await req.body;
    if (!name || !login || !password) {
      await res
        .status(BAD_REQUEST)
        .send({ error: 'All fields must be fulfilled' });
      return;
    }
    const user = new User(await req.body);
    await saveUser(user);
    await res.status(CREATED).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    if (await getUserById(req.params.id)) {
      await updateUser(req.params.id, req.body);
      await res.status(OK).json(User.toResponse(getUserById(req.params.id)));
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
    if (await getUserById(req.params.id)) {
      await deleteUser(req.params.id);
      await res.status(NO_CONTENT).end();
      return;
    }
    await res
      .status(NOT_FOUND)
      .send({ message: 'User not found' })
      .end();
  })
);

module.exports = router;
