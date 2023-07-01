const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { NOT_FOUND_ERROR } = require('./utils/errors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(DB_URL);

app.use(helmet());
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649c8d3ba4630068eee451ce',
  };
  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' });
});

app.listen(PORT);
