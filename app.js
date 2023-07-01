const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649c8d3ba4630068eee451ce',
  };
  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`Сервер работает, порт ${PORT}`);
});
