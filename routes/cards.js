const router = require('express').Router();
const {
  getCards, removeCardById, createCard, addLikeToCard, removeLikeFromCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', removeCardById);
router.post('/', createCard);
router.put('/:cardId/likes', addLikeToCard);
router.delete('/:cardId/likes', removeLikeFromCard);

module.exports = router;
