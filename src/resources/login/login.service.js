const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { getUserByLogin } = require('../users/user.service');

const postLogin = async pair => {
  const user = await getUserByLogin(pair.login);
  if (!user) return false;
  const res = await bcrypt.compare(pair.password, user.password);
  if (!res) return false;
  return jwt.sign({ id: user._id, login: user.login }, JWT_SECRET_KEY);
};

const checkLogin = token => {
  try {
    jwt.verify(token, JWT_SECRET_KEY);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { postLogin, checkLogin };
