import { LIST_DECKS, DELETE_DECK, UPDATE_DECK, SAVE_DECK } from ".";

export function listDecks(decks) {
  return {
    type: LIST_DECKS,
    decks,
  };
}
