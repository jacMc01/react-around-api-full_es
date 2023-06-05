const express = require('express');
const usersAPI = express.Router();

const {
  getUsers,
  getUserById,
  getUser,
  createUser,
  addProfile,
  addAvatar
} = require('../controllers/users');



usersAPI.get('/', getUsers);
usersAPI.get('/me', getUser);
usersAPI.get('/:id', getUserById);

usersAPI.post('/', createUser);
usersAPI.patch('/me', addProfile);
usersAPI.patch('/me/avatar', addAvatar);

module.exports = usersAPI;
