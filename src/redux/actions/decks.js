import {
  LIST_DECKS,
  DELETE_DECK,
  UPDATE_DECK,
  SAVE_DECK,
  ADD_CARD,
  GET_DECK,
  CLEAR_DECK,
  DELETE_CARD,
} from ".";

export function listDecks(decks) {
  return {
    type: LIST_DECKS,
    decks,
  };
}

export function saveDeck(deck) {
  return {
    type: SAVE_DECK,
    deck,
  };
}

export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title,
  };
}

export function setDeck(deck) {
  return {
    type: GET_DECK,
    deck,
  };
}

export function clearDeck() {
  return {
    type: CLEAR_DECK,
  };
}

export function addCard(question, title) {
  return {
    type: ADD_CARD,
    question,
    title,
  };
}

export function deleteCard(title, idCard) {
  return {
    type: DELETE_CARD,
    title,
    idCard,
  };
}

export function updateDeck(title, oldTitle) {
  return {
    type: UPDATE_DECK,
    title,
    oldTitle,
  };
}
