const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

const DOCUMENT_CREATED = 201;

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const removeCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (req.user._id === card.owner.toString()) {
          card.deleteOne()
            .then((deletedCard) => {
              res.send(deletedCard);
            })
            .catch(next);
        } else {
          throw new ForbiddenError('Недостаточно прав для удаления карточки');
        }
      } else {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => {
      res.status(DOCUMENT_CREATED).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
        return;
      }
      next(err);
    });
};

const addLikeToCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
    })
    .catch(next);
};

const removeLikeFromCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  removeCardById,
  createCard,
  addLikeToCard,
  removeLikeFromCard,
};
