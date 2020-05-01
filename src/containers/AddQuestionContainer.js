import { connect } from "react-redux";
import AddQuestionScreen from "../screens/AddQuestionScreen";
import { addCardToDeck, updateCardOfDeck, getDeck } from "../api";
import { addCard, updateCard, setDeck, clearDeck } from "../redux/actions/decks";
import { success, failed, pending } from "../redux/actions/messages";
import { reset } from "redux-form";
import { generateUid } from "../utils/helpers";

const mapStateToProps = (state, { route }) => {
  const { questionId } = route.params;
  const deck = state.deck.deck;
  const question = deck.questions[questionId];  
  
  return {
    status: state.message.status,
    initialValues: {
      question:
        questionId !== undefined ? (question ? question.question : "") : "",
      answer: questionId !== undefined ? (question ? question.answer : "") : "",
    },
  };
};

const mapDispatchToProps = (dispatch, { route, navigation }) => ({
  addCard: async (card) => {
    try {
      const { title } = route.params;

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

  clearDeck: () => {
    dispatch(clearDeck());
  },

  updateCard: async (card) => {
    try {
      const { title, questionId } = route.params;      

      dispatch(pending());

      await updateCardOfDeck(title, questionId, card);

      dispatch(updateCard(title, questionId, card));

      dispatch(success("You Successfully update the card"));

      dispatch(reset("AddCardForm"));
    } catch (error) {
      console.log(error);
      dispatch(failed("An Error Occurred"));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionScreen);
