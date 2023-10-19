const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');

const userModel = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    validate: {
      validator(avatar) {
        validator.isURL(avatar);
      },
      message: 'Некорректная ссылка',
    },
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        validator.isEmail(email);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userModel.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      console.log('no user');
      return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      console.log('user ok');
      if (!matched) {
        console.log('pass wrong');
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      console.log('pass ok');
      return user;
    });
  });
};

module.exports = mongoose.model('user', userModel);
