import {
  LIST_DECKS,
  SAVE_DECK,
  DELETE_DECK,
  ADD_CARD,
  GET_DECK,
  CLEAR_DECK,
  DELETE_CARD
} from "../actions";
import _ from "lodash";

const initialState = {
  listOfDecks: {},
  deck: {},
};

export default function (state = initialState, action) {
  const title = action.title;
  const decks = state.listOfDecks;
  const deck = decks[title] || action.deck;
  const question = action.question;

  switch (action.type) {
    case LIST_DECKS:
      return {
        ...state,
        listOfDecks: {...action.decks},
      };
    case SAVE_DECK:
      return {
        ...state,
        listOfDecks: {[title]: action.deck, ...state.listOfDecks},
      };
    case DELETE_DECK:            

      decks[title] = undefined;
      delete decks[title];

      return {
        ...state,
        listOfDecks: {...decks}
      };
    case ADD_CARD:                  
      deck.questions = {[question.id]: question, ...deck.questions};     

      return {
        ...state,
        listOfDecks: Object.assign({}, decks, {
          [title]: deck,
          ...decks
        })        
      };
    case GET_DECK:
      return {
        ...state,
        deck: action.deck ,
      };
    case CLEAR_DECK:
      return {
        ...state,
        deck: {},
      };
    case DELETE_CARD:
      
      deck.questions[action.idCard] = undefined;
      delete deck.questions[action.idCard]
      
      return {
        ...state,
        listOfDecks: Object.assign({}, state.listOfDecks, {
          [title]: deck,
          ...state.listOfDecks
        })
      }
    default:
      return state;
  }
}
