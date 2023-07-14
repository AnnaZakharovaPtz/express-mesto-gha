const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  removeCardById,
  createCard,
  addLikeToCard,
  removeLikeFromCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), removeCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .pattern(/(http|https):\/\/(\w+(-\w+)*\.)+[a-z]{2,}(\/+[\w\-._~:/?#[\]@!$&'()*+,;=]{1,})*/),
  }),
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), addLikeToCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), removeLikeFromCard);

module.exports = router;
