const jwt = require('jsonwebtoken');
const { AUTHORIZATION_SCHEMA, JWT_SECRET_KEY } = require('../common/config');
const { UNAUTHORIZED, BAD_REQUEST } = require('http-status-codes');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) res.status(UNAUTHORIZED).end();
  try {
    const verified = jwt.verify(
      token.replace(AUTHORIZATION_SCHEMA, '').replace(' ', ''),
      JWT_SECRET_KEY
    );
    req.user = verified;
  } catch (error) {
    res.status(BAD_REQUEST).end();
  }
  next();
};

module.exports = authMiddleware;
