import { connect } from "react-redux";
import DeckDetailsScreen from "../screens/DeckDetailsScreen";
import { removeDeck, clear, getDeck } from "../api";
import { deleteDeck } from "../redux/actions/decks";
import { success, failed, pending } from "../redux/actions/messages";

const mapStateToProps = (state, { route }) => {  
  return {
    status: state.message.status    
  };
};

const mapDispatchToProps = (dispatch, { route, navigation }) => ({
  deleteDeck: async (itle) => {
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
      dispatch(success());
      return deck;
    } catch (error) {
      console.log(error);
      dispatch(failed("An Error Occurred"));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetailsScreen);
