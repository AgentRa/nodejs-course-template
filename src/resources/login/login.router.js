const router = require('express').Router();
// const User = require('./user.model');
// const validator = require('../../utils/validator/validator');
// const { id, user } = require('../../utils/validator/schemas');
const { OK, FORBIDDEN } = require('http-status-codes');
const { postLogin } = require('./login.service');

const catchErrors = require('../../utils/catchErrors');

// Controller Layer

router.route('/').post(
  catchErrors(async (req, res) => {
    const token = await postLogin(req.body);
    if (token) res.status(OK).send({ token });
    res.status(FORBIDDEN).end();
  })
);

module.exports = router;
