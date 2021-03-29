const Card = require('../models/card.js');
const CastError = require('../errors/CastError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

function getCards(req, res, next) {
  Card.find()
    .then((card) => res.status(200).send(card))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user.id,
    createdAt: Date.now(),
  })
    .then((card) => res.status(200).send(card))
    .catch(next);
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card) throw new CastError('Неверный id карточки');
      if (card.owner.toString() === req.user.id.toString()) {
        Card.findByIdAndRemove(cardId)
          .then((cardToRemove) => res.status(200).send(cardToRemove))
          .catch(next);
      } else {
        throw new ForbiddenError('Вы не можете удалять карточки, которые были созданы не вами');
      }
    })
    .catch(next);
}

function addLike(req, res, next) {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch(next);
}

function removeLike(req, res, next) {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
