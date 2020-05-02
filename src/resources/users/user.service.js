const usersRepo = require('./user.db.repository');
const { removeUserId } = require('../tasks/task.service');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../common/config');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const getUserByLogin = login => usersRepo.getUserByLogin(login);

const saveUser = async user => {
  const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
  return usersRepo.saveUser({ ...user, password: hash });
};

const updateUser = (id, userInfo) => usersRepo.updateUser(id, userInfo);

const deleteUser = async id => {
  await removeUserId(id);
  await usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  getUserById,
  saveUser,
  updateUser,
  deleteUser,
  getUserByLogin
};
