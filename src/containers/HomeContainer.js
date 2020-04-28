import { connect } from "react-redux";
import HomeScreen from "../screens/HomeScreen";
import { getDecks } from "../api";
import { listDecks } from "../redux/actions/decks";
import { success, failed, pending } from "../redux/actions/messages";

const mapStateToProps = (state) => {
  return {
    status: state.message.status,
    listOfDecks: state.deck.listOfDecks,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  listDecks: async () => {
    try {
      dispatch(pending());

      const decks = await getDecks();
      console.log(decks);
      decks === null
        ? dispatch(listDecks([]))
        : dispatch(listDecks(Object.values(decks)));

      dispatch(success("Success"));
    } catch (error) {
      console.log(error);
      dispatch(failed("Problem to get Decks"));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
