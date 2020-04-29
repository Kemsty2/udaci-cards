import { LIST_DECKS, SAVE_DECK, DELETE_DECK } from "../actions";
import _ from "lodash";

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
        listOfDecks: [action.deck, ...state.listOfDecks],
      };
    case DELETE_DECK:
      return {
        ...state,
        listOfDecks: _.filter(
          state.listOfDecks,
          (deck) => deck.title !== action.title
        ),
      };
    default:
      return state;
  }
}
