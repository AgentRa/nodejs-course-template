const { getUserByLogin } = require('../users/user.service');

const isUser = login => getUserByLogin(login);

module.exports = {
  isUser
};
