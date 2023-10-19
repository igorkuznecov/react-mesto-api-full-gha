const users = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const {
  findAllUsers,
  findUserById,
  updateUserInfo,
  updateUserAvatar,
  me,
} = require('../controllers/users');

users.get('/', findAllUsers);
users.get('/me', me);

users.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }),
  findUserById,
);

users.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUserInfo,
);

users.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/).required(),
    }),
  }),
  updateUserAvatar,
);

users.use(errors());
module.exports = users;
