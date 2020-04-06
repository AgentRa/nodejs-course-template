const usersRepo = require('./user.memory.repository');
const { getTasksByUserId } = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const saveUser = user => usersRepo.saveUser(user);

const updateUser = (id, userInfo) => usersRepo.updateUser(id, userInfo);

const deleteUser = async id => {
  await getTasksByUserId(id).forEach(task => (task.userId = null));
  await usersRepo.deleteUser(id);
};

module.exports = { getAll, getUserById, saveUser, updateUser, deleteUser };
