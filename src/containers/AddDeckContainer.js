import { connect } from "react-redux";
import AddDeckScreen from "../screens/AddDeckScreen";
import { saveDeckTitle, clear, getDeck, updateDeckTitle } from "../api";
import {
  saveDeck,
  setDeck,
  clearDeck,
  updateDeck,
} from "../redux/actions/decks";
import { success, failed, pending } from "../redux/actions/messages";
import { reset } from "redux-form";

const mapStateToProps = (state) => {
  const deck = state.deck.deck;
  
  return {
    status: state.message.status,
    initialValues: { title: deck.title || "" },
  };
};

const mapDispatchToProps = (dispatch, { route }) => ({
  saveDeck: async (title) => {
    try {
      dispatch(pending());
      const deck = await saveDeckTitle(title);

      dispatch(saveDeck(deck));

      dispatch(success("You Successfully create a new Deck"));

      dispatch(reset("AddDeckForm"));
      /* clear(); */
    } catch (error) {
      console.log(error);
      dispatch(failed("Failed on Create New Deck"));
    }
  },
  getDeck: async () => {
    try {
      const { title } = route.params;

      dispatch(pending());

      const deck = await getDeck(title);
      dispatch(setDeck(deck));

      dispatch(success());
    } catch (error) {
      console.log(error);
      dispatch(failed("An Error Occurred"));
    }
  },
  clearDeck: () => {
    dispatch(clearDeck());
  },
  updateDeck: async (newTitle) => {
    try {
      const { title } = route.params;

      dispatch(pending());
      await updateDeckTitle(newTitle, title);

      dispatch(updateDeck(newTitle, title));

      dispatch(success("You Successfully update the deck"));

      dispatch(reset("AddDeckForm"));
    } catch (error) {
      console.log(error);
      dispatch(failed("An Error Occurred"));
    }
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddDeckScreen);
