const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: "Jacques Costeau"
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: "Explorador"
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator: (v) => {
        return /(http|https):\/\/(www\.)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/.test(
          v
        );
      },
    },
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
  // add email and password fields here
  // using validator library
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return validator.isEmail(v);
      },
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  }

});


userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      console.log("inside findUserByCredentials")
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          console.log("return user")
          return user; // ahora user está disponible
        });
    });
};

module.exports = mongoose.model("user", userSchema);
