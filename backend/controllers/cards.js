const Card = require('../models/card');

function getCards(req, res) {
  Card.find()
    .then((card) => res.send(card))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

function createCard(req, res) {
  Card.create({ owner: req.user, ...req.body })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Данные невалидны' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new Error('notExistId'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'notExistId') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
