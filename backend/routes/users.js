const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const CastError = require('../errors/CastError');
const {
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users.js');

const linkValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new CastError('Переданы некорректные данные');
  }
  return value;
};

userRouter.get('/me', getCurrentUserInfo);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatarUrl: Joi.string().required().custom(linkValidator),
  }),
}), updateUserAvatar);

module.exports = userRouter;
