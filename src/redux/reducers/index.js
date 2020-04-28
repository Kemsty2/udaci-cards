import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import messageReducer from "./messages";
import deckReducer from "./decks";

const reducers = {
    form: formReducer,
    message: messageReducer,
    deck: deckReducer
}

const allReducers = combineReducers(reducers);

export default allReducers;