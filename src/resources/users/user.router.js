const router = require('express').Router();
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
    await res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const user = await getUserById(req.params.id);
    if (user) {
      await res.json(User.toResponse(user));
      return;
    }
    await res.status(404).send({ error: 'User not found' });
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { name, login, password } = await req.body;
    if (!name || !login || !password) {
      await res.status(400).send({ error: 'All fields must be fulfilled' });
      return;
    }
    const user = new User(await req.body);
    await saveUser(user);
    await res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    if (await getUserById(req.params.id)) {
      await updateUser(req.params.id, req.body);
      await res.json(User.toResponse(getUserById(req.params.id)));
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
    if (await getUserById(req.params.id)) {
      await deleteUser(req.params.id);
      await res.status(200).end();
      return;
    }
    await res
      .status(404)
      .send({ message: 'User not found' })
      .end();
  })
);

module.exports = router;
