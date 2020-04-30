import { connect } from "react-redux";
import AddQuestionScreen from "../screens/AddQuestionScreen";
import { addCardToDeck } from "../api";
import { addCard } from "../redux/actions/decks";
import { success, failed, pending } from "../redux/actions/messages";
import { reset } from "redux-form";
import {generateUid} from "../utils/helpers";

const mapStateToProps = (state) => {
  return {
    status: state.message.status,
  };
};

const mapDispatchToProps = (dispatch, { route, navigation }) => ({
  addCard: async (card) => {
    try {
      const {title} = route.params;

      dispatch(pending());
      card.id = generateUid();
      
      await addCardToDeck(title, card);
      dispatch(addCard(card, title));

      dispatch(success("Successfully Created New Card"));
      dispatch(reset("AddCardForm"));
      
    } catch (error) {
      console.log(error);
      dispatch(failed("An Error occurred"));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionScreen);
