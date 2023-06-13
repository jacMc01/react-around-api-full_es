const express = require('express');
const cardsAPI = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

cardsAPI.get('/', getCards);
cardsAPI.post('/', createCard);
cardsAPI.delete('/:cardId', deleteCard);
cardsAPI.put('/likes/:cardId', likeCard);
cardsAPI.delete('/likes/:cardId', dislikeCard);

module.exports = cardsAPI;
