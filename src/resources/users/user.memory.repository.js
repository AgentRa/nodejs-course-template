const users = [];

const getAll = () => users;

const getUserById = id => users.find(user => user.id === id);

const saveUser = user => {
  users.push(user);
};

const updateUser = (id, userInfo) => {
  const user = users.find(item => item.id === id);
  users.splice(users.indexOf(user), 1, { ...user, ...userInfo });
};

const deleteUser = id => {
  const user = users.find(item => item.id === id);
  users.splice(users.indexOf(user), 1);
};

module.exports = { getAll, getUserById, saveUser, updateUser, deleteUser };
