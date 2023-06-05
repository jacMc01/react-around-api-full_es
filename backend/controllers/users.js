const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');


function login(req, res){

  // obtain the username and password from the request body
  console.log(req.body)
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      console.log('user')
      console.log(user)
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });

}

function getUsers(req, res){
    // console.log(`URL: http://localhost:3000${req.url}`);
    // res.json({ message: 'Conectado correctamente a la URL http://localhost:3000/users' });
    return userModel.find({})
    .then((users) => res.send({data: users}))
    .catch((err) => res.status(500).send({message: `No se encuentra el recurso`}))
}

function getUser(req, res){
  return userModel.findById(req.user._id)
  .then((user) => res.send({data: user}))
  .catch((err) => res.status(500).send({message: `No se encuentra el recurso`}))
}

function getUserById(req, res){
  userModel.findById(req.params.id)
  .orFail(() => {
    const err = new Error('No se encontro ningun usuario con ese id')
    err.statusCode = 404;
    throw err;
  })
}

function createUser(req, res) {
  // if there is no body, return an error
  if (!req.body) {
    res.status(400).send({ message: 'Faltan datos para crear el usuario' });
    return;
  }
  // extract the parameters from the request body
  let { name, about, avatar, email, password } = req.body;

// Pass the password to the bcrypt instance.
  bcrypt.hash(password, 10).then((hash) => {
    // Now we can store the password hash in db.
    password = hash;

    const userElement = new userModel({ name, about, avatar, email, password });

    userElement.save()
      .then((user) => res.send({ data: user }))
      .catch((err) => res.status(400).send({ message: 'Hubo un error al guardar el usuario', error: err }));

  }).catch((err) => {
    res.status(500).send({ message: 'Hubo un error al crear el usuario', error: err });
  })

}

function addProfile(req, res){
  userModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .orFail(() => {
    const err = new Error('No se encontro ningun usuario con ese id')
    err.statusCode = 404;
    throw err;
  })
  .then((updatedUser) => res.send({data: updatedUser}))
  .catch((err) => res.status(400).send({message: `Hubo un error al actualizar el perfil: ${err}`}));
}

function addAvatar(req, res){
  userModel.findByIdAndUpdate(req.params.id, {avatar: req.body.avatar}, {new: true})
  .orFail(() => {
    const err = new Error('No se encontro ningun usuario con ese id')
    err.statusCode = 404;
    throw err;
  })
  .then((updatedUser) => res.send({data: updatedUser}))
  .catch((err) => res.status(400).send({message: `Hubo un error al actualizar el avatar: ${err}`}));
}

module.exports = {
  login,
  getUsers,
  getUser,
  getUserById,
  createUser,
  addProfile,
  addAvatar
}
