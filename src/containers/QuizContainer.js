import { connect } from "react-redux";
import QuizScreen from "../screens/QuizScreen";
import { getDeck } from "../api";
import { addResponse, clearResponse, setDeck } from "../redux/actions/decks";
import { success, pending, failed } from "../redux/actions/messages";

const mapStateToProps = (state, { route }) => {
  let question = null,
    next = null,
    previous = null;

  const { questionId } = route.params;
  const deck = state.deck.deck;

  const keys = Object.keys(deck.questions);
  const index = keys.indexOf(questionId);

  question = deck.questions[questionId];
  next = index !== -1 && keys.length > index + 1 ? keys[index + 1] : null;
  previous = index !== -1 && index - 1 >= 0 ? keys[index - 1] : null;

  return {
    status: state.message.status,
    deck,
    question,
    next,
    previous,
    error: index !== -1,
    index,
    total: Object.values(deck.questions).length,
    responses: state.deck.responses,
    showResult:
      Object.values(deck.questions).length ===
      Object.values(state.deck.responses).length,
  };
};

const mapDispatchToProps = (dispatch, { route }) => ({
  addResponse: (response) => {
    try {
      const { questionId } = route.params;

      dispatch(pending());
      dispatch(addResponse(questionId, response));
      dispatch(success());
    } catch (error) {
      dispatch(failed());
    }
  },
  clearResponse: () => {
    dispatch(clearResponse());
  },
  getDeck: () => {
    try {
      const title = route.params.title;

      dispatch(pending());

      getDeck(title)
        .then((deck) => {
          dispatch(setDeck(deck));

          dispatch(success());
        })
        .catch(() => {
          dispatch(failed("An Error Occurred"));
        });
    } catch (error) {
      console.log(error);
      dispatch(failed("An Error Occurred"));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);
