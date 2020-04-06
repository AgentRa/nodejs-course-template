const User = require('./user.model');

const users = [
  {
    id: '1',
    name: 'Leanne Graham',
    login: 'Bret',
    password: 'SSDAFefwfg'
  },
  {
    id: '2',
    name: 'Ervin Howell',
    login: 'Antonette',
    password: 'qqqQQQqq'
  },
  {
    id: '3',
    name: 'Clementine Bauch',
    login: 'Samantha',
    password: 'eqwveqweqw'
  },
  {
    id: '4',
    name: 'Patricia Lebsack',
    login: 'Karianne',
    password: 'tbertbertbe'
  },
  {
    id: '5',
    name: 'Chelsey Dietrich',
    login: 'Kamren',
    password: 'qhjmuyjuy'
  },
  {
    id: '6',
    name: 'Mrs. Dennis Schulist',
    login: 'Leopoldo_Corkery',
    password: 'qweqwdfs'
  },
  {
    id: '7',
    name: 'Kurtis Weissnat',
    login: 'Elwyn.Skiles',
    password: '123vvvy65'
  },
  {
    id: '8',
    name: 'Nicholas Runolfsdottir V',
    login: 'Maxime_Nienow',
    password: '34tv536yhn'
  },
  {
    id: '9',
    name: 'Glenna Reichert',
    login: 'Delphine',
    password: 'wqev234'
  },
  {
    id: '10',
    name: 'Clementina DuBuque',
    login: 'Moriah.Stanton',
    password: 'qwevqi'
  },
  new User({
    name: 'Babylon bubo',
    login: 'bubonik',
    password: 'qwdiojqwf'
  })
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
