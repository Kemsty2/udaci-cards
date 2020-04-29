import { connect } from "react-redux";
import HomeScreen from "../screens/HomeScreen";
import { getDecks, clear } from "../api";
import { listDecks } from "../redux/actions/decks";
import { success, failed, pending } from "../redux/actions/messages";
import _ from "lodash";

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
      
      decks === null
        ? dispatch(listDecks([]))
        : dispatch(
            listDecks(
              Object.values(
                _.orderBy(JSON.parse(decks), ["createdAt"], ["desc"])
              )
            )
          );

      dispatch(success());      
    } catch (error) {
      console.log(error);
      dispatch(failed("Problem to get Decks"));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
