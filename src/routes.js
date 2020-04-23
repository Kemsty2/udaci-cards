import AddQuestion from "./screens/AddQuestionScreen";
import DeckDetails from "./screens/DeckDetailsScreen";
import Quiz from "./screens/QuizScreen";
import Home from "./screens/HomeScreen";
import SafeAreaView from "react-native-safe-area-view";
import {StatusBar} from "react-native";

function HomeScreen(props) {
  return (
    <SafeAreaView styles={[styles.container, { backgroundColor: "#6a51ae" }]}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Home {...props} />
    </SafeAreaView>
  );
}

export const Routes = {
  Home: {
    component: HomeScreen,
    title: "Home",
  },
  DeckDetails: {
    component: DeckDetails,
    title: "Deck Details",
  },
  AddQuestion: {
    component: AddQuestion,
    title: "Add Question",
  },
  Quiz: {
    component: Quiz,
    title: "Quiz",
  },
};
