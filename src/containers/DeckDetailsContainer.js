import { connect } from "react-redux";
import DeckDetailsScreen from "../screens/DeckDetailsScreen";
import { removeDeck, clear, getDeck, deleteCardToDeck } from "../api";
import {
  deleteDeck,
  setDeck,
  clearDeck,
  deleteCard,
} from "../redux/actions/decks";
import { success, failed, pending } from "../redux/actions/messages";

const mapStateToProps = (state, { route }) => {
  return {
    status: state.message.status,
    deck: state.deck.deck,
  };
};

const mapDispatchToProps = (dispatch, { route, deck }) => ({
  deleteDeck: async () => {
    try {
      const title = route.params.title;

      dispatch(pending());

      await removeDeck(title);
      dispatch(deleteDeck(title));

      dispatch(success(`Successfully Delete Deck ${route.params.title}`));
    } catch (error) {
      dispatch(failed("An Error Occurred"));
    }
  },
  getDeck: async () => {
    try {
      const title = route.params.title;

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

  deleteCard: (id) => {
    try {
      const title = route.params.title;

      dispatch(pending());

      deleteCardToDeck(title, id).then(() => {
        dispatch(deleteCard(title, id));

        dispatch(success());
      });
    } catch (error) {
      console.log(error);
      dispatch(failed("An Error Occurred"));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetailsScreen);
