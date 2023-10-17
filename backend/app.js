const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const express = require('express');

const app = express();
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const authChecker = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const NotFoundError = require('./errors/not-found-err');
const cors = require('cors')
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log('Connected to DB');
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().min(2).max(30).required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().alphanum().min(2).max(30),
      about: Joi.string().alphanum().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().email().required(),
      password: Joi.string().min(2).max(30).required(),
    }),
  }),
  createUser,
);

app.use(authChecker);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
