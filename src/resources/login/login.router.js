const router = require('express').Router();
const catchErrors = require('../../utils/catchErrors');
const { FORBIDDEN } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const {
  HTTP_HEADER_AUTHORIZATION,
  JWT_SECRET_KEY
} = require('../../common/config');
const loginServices = require('../login/login.service');

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await loginServices.isUser(req.body.login);
    if (!user) res.status(FORBIDDEN).send({ message: 'Forbidden' });
    user.comparePassword(req.body.password, (error, match) => {
      if (!match) res.status(FORBIDDEN).send({ message: 'Forbidden' });
    });
    const _token = jwt.sign(
      { login: user.login, userId: user._id },
      JWT_SECRET_KEY
    );
    return res
      .header(HTTP_HEADER_AUTHORIZATION, _token)
      .send({ token: _token });
  })
);

module.exports = router;
