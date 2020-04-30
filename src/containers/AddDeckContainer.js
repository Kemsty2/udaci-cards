import { connect } from "react-redux";
import AddDeckScreen from "../screens/AddDeckScreen";
import { saveDeckTitle, clear } from "../api";
import { saveDeck } from "../redux/actions/decks";
import { success, failed, pending } from "../redux/actions/messages";
import {reset} from 'redux-form';

const mapStateToProps = (state) => {
  return {
    status: state.message.status,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
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
});
export default connect(mapStateToProps, mapDispatchToProps)(AddDeckScreen)
