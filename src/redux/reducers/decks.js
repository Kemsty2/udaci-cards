import {
  LIST_DECKS,
  SAVE_DECK,
  DELETE_DECK,
  ADD_CARD,
  GET_DECK,
  CLEAR_DECK,
  DELETE_CARD,
  UPDATE_DECK,
  UPDATE_CARD,
  ADD_RESPONSE,
  CLEAR_RESPONSE,
} from "../actions";
import _ from "lodash";

const initialState = {
  listOfDecks: {},
  deck: {},
  responses: {},
};

export default function (state = initialState, action) {
  const title = action.title;
  const decks = state.listOfDecks;
  const deck = decks[title] || action.deck;
  const question = action.question;
  const oldTitle = action.oldTitle;
  const questionId = action.questionId;
  const card = action.card;
  const response = action.response;

  switch (action.type) {
    case LIST_DECKS:
      return {
        ...state,
        listOfDecks: { ...action.decks },
      };
    case SAVE_DECK:
      return {
        ...state,
        listOfDecks: { [action.deck.title]: action.deck, ...state.listOfDecks },
      };
    case DELETE_DECK:
      decks[title] = undefined;
      delete decks[title];

      return {
        ...state,
        listOfDecks: { ...decks },
      };
    case ADD_CARD:
      deck.questions = { [question.id]: question, ...deck.questions };

      return {
        ...state,
        listOfDecks: Object.assign({}, decks, {
          [title]: deck,
          ...decks,
        }),
      };
    case GET_DECK:
      return {
        ...state,
        deck: action.deck,
      };
    case CLEAR_DECK:
      return {
        ...state,
        deck: {},
      };
    case DELETE_CARD:
      deck.questions[action.idCard] = undefined;
      delete deck.questions[action.idCard];

      return {
        ...state,
        listOfDecks: Object.assign({}, state.listOfDecks, {
          [title]: deck,
          ...state.listOfDecks,
        }),
      };
    case UPDATE_DECK:
      const oldDeck = decks[oldTitle];
      oldDeck.title = title;
      decks[oldTitle] = undefined;
      delete decks[oldTitle];

      return {
        ...state,
        listOfDecks: {
          [title]: oldDeck,
          ...decks,
        },
      };
    case UPDATE_CARD:
      let oldQuestions = deck.questions[questionId];

      oldQuestions = Object.assign({}, oldQuestions, {
        ...oldQuestions,
        ...card,
      });
      deck.questions[questionId] = undefined;
      delete deck.questions[questionId];

      const questions = Object.assign({}, deck.questions, {
        [questionId]: oldQuestions,
        ...deck.questions,
      });

      deck.questions = { ...questions };
      decks[title] = undefined;
      delete decks[title];

      return {
        ...state,
        listOfDecks: {
          [title]: deck,
          ...decks,
        },
      };

    case ADD_RESPONSE:
      return {
        ...state,
        responses: {
          [questionId]: response,
          ...state.responses,
        },
      };
    case CLEAR_RESPONSE:
      return {
        ...state,
        responses: {},
      };
    default:
      return state;
  }
}
