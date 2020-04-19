const usersRepo = require('./user.db.repository');
const { removeUserId } = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const saveUser = user => usersRepo.saveUser(user);

const updateUser = (id, userInfo) => usersRepo.updateUser(id, userInfo);

const deleteUser = async id => {
  await removeUserId(id);
  await usersRepo.deleteUser(id);
};

module.exports = { getAll, getUserById, saveUser, updateUser, deleteUser };
