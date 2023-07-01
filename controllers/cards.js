const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR, INTERNAL_SERVER_ERROR } = require('../utils/errors');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемая карточка не найдена' });
      }
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Неверный запрос' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const addLikeToCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемая карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Неверный запрос' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeLikeFromCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемая карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Неверный запрос' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  removeCardById,
  createCard,
  addLikeToCard,
  removeLikeFromCard,
};
