const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const CastError = require('../errors/CastError');
const {
  getUser,
  getUsers,
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

userRouter.get('/', getUsers);

userRouter.get('/me', getCurrentUserInfo);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({ userId: Joi.string().required().length(24).hex() }),
}), getUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(linkValidator),
  }),
}), updateUserAvatar);

module.exports = userRouter;
