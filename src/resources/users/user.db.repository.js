const User = require('./user.model');

const getAll = async () => User.find({});

const getUserById = async id => User.findById(id);

const saveUser = async user => User.create(user);

const updateUser = async (_id, userInfo) =>
  await User.updateOne({ _id }, userInfo);

const deleteUser = async _id => (await User.deleteOne({ _id })).ok;

module.exports = { getAll, getUserById, saveUser, updateUser, deleteUser };
