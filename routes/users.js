const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .pattern(/(http|https):\/\/(\w+(-\w+)*\.)+[a-z]{2,}(\/+[\w\-._~:/?#[\]@!$&'()*+,;=]{1,})*/)
      .required(),
  }),
}), updateUserAvatar);

module.exports = router;
