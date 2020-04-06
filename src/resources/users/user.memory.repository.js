const users = [
  {
    id: '1',
    name: 'Alex',
    login: 'test1',
    password: 'wehoeiwjfiojw'
  },
  {
    id: '2',
    name: 'KING',
    login: 'test2 ',
    password: 'BANGER'
  },
  {
    id: '3',
    name: 'LeeEEE',
    login: 'test3',
    password: 'Magic'
  }
];

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
