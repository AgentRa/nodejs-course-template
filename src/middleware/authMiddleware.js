const { checkLogin } = require('../resources/login/login.service');
const requestError = require('../utils/requestError');

const authMiddleware = (req, res, next) => {
  const rout = req.url.split('/')[1];
  if (rout === 'login' || rout === 'doc' || rout === '') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new requestError(401, 'Unauthorized');
  }

  const token = authHeader.substring(7);
  const authTrue = checkLogin(token);
  if (!authTrue) {
    throw new requestError(401, 'Unauthorized');
  }

  next();
};

module.exports = authMiddleware;
