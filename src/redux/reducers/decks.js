import { LIST_DECKS, SAVE_DECK } from "../actions";

const initialState = {
  listOfDecks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_DECKS:
      return {
        ...state,
        listOfDecks: [...action.decks],
      };
    case SAVE_DECK:
      return {
        ...state,
        listOfDecks: [...state.listOfDecks, action.deck],
      };
    default:
      return state;
  }
}
