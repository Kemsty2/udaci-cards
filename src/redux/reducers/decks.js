import {LIST_DECKS} from "../actions"

const initialState = {
    listOfDecks: []
}

export default function (state = initialState, action){
    switch(action.type){
      case LIST_DECKS:
        return {
          ...state,
          listOfDecks: [...action.decks]
      }
      default: 
        return state;      
    }
}