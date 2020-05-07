import React, { Component } from "react";
import {
  Container,
  Right,
  Left,
  Header,
  Title,
  Button,
  Icon,
  Body,
  Card,
  CardItem,
  Segment,
} from "native-base";
import {
  StatusBar,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { white, light_dark, red } from "../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "../components/Loader";
import { styles, cardStyle } from "./styles/QuizScreen.style";
import CardFlip from "react-native-card-flip";
import ProgressBar from "../components/ProgressBar";
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";

/**
 * Quiz View
 */

function Item({ icon, onPress, question, answer }) {
  return (
    <Card style={cardStyle.card}>
      <LinearGradient
        colors={["#141e30", "#243b55"]}
        style={cardStyle.gradient}
      >
        <CardItem style={cardStyle.cardItem}>
          <Body
            style={[
              cardStyle.cardContainer,
              { flexDirection: answer ? "row-reverse" : "row" },
            ]}
          >
            <View style={cardStyle.firstContainer}>
              <View style={cardStyle.titleContainer}>
                <Text style={cardStyle.title}>{question} </Text>
              </View>
            </View>
            <View style={cardStyle.divider} />
            <TouchableOpacity
              style={cardStyle.secondContainer}
              onPress={onPress}
            >
              <Icon
                transparent
                name=""
                name={icon}
                style={{
                  color: white,
                  fontWeight: "bold",
                  marginLeft: answer ? 0 : 15,
                  marginRight: answer ? 15 : 0,
                }}
              />
            </TouchableOpacity>
          </Body>
        </CardItem>
      </LinearGradient>
    </Card>
  );
}

class QuizScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      isPending: false,
      numberTrueAnswer: 0,
      numberFalseAnswer: 0,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.props.getDeck();
      
      const {responses, showResult} = this.props;

      if (showResult) {        

        this.setState({
          isPending: true,
        });

        //calcule les resultats;
        const totalAsnwer = Object.keys(responses).length;
        let numberTrueAnswer = Object.values(responses).filter((elt) => elt)
          .length;
        let numberFalseAnswer = Object.values(responses).filter((elt) => !elt)
          .length;        

        numberTrueAnswer = parseFloat(Number.parseFloat(numberTrueAnswer / totalAsnwer).toFixed(2));
        numberFalseAnswer = parseFloat(Number.parseFloat(numberFalseAnswer / totalAsnwer).toFixed(2));        

        //  Show Answer
        this.setState({
          isPending: false,
        });

        setTimeout(() => {
          this.setState({
            numberTrueAnswer,
            numberFalseAnswer,
          });
        }, 1000);

        //  Clear Notification
        clearLocalNotification().then(setLocalNotification);
      }
    });

    this.setState({
      isReady: true,
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    this.props.clearResponse();
  }

  flip = () => {
    this.card.flip();
  };

  addResponse = (response) => {
    const { route, addResponse, navigation, next, total, responses } = this.props;
    const { title, questionId } = route.params;

    addResponse(response);

    if((total - Object.keys(responses).length) === 1){
      navigation.push("Quiz", {
        title,
        questionId: next === null ? questionId : next,
      });
    }else{
      navigation.navigate("Quiz", {
        title,
        questionId: next === null ? questionId : next,
      });
    }
    
  };

  toDeckDetails = () => {
    const { navigation, route } = this.props;
    const { title } = route.params;

    navigation.navigate("Deck Details", { title });
  };

  restartQuiz = () => {
    const {deck, route, navigation} = this.props;
    const {title} = route.params;

    this.props.clearResponse();
    
    navigation.push("Quiz", {
      title,
      questionId : Object.keys(deck.questions)[0]
    })
  };

  render() {
    const {
      navigation,
      question,
      status,
      index,
      previous,
      next,
      total,
      error,
      route,
      responses,
      showResult,
    } = this.props;
    const { title, questionId } = route.params;
    const answer = responses[questionId];
    const { isPending, numberTrueAnswer, numberFalseAnswer } = this.state;    

    if (!this.state.isReady) {
      return <Spinner color={light_dark} />;
    }
    if (status === "pending") {
      return <Spinner color={light_dark} />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Container>
          <LinearGradient
            colors={["#141e30", "#243b55"]}
            style={styles.gradient}
          >
            <Header span style={{ backgroundColor: "transparent" }}>
              <Left>
                <Button transparent onPress={this.toDeckDetails}>
                  <Icon name="arrow-back" style={styles.iconBack} />
                </Button>
              </Left>
              <Body style={styles.innerContainer}>
                <Title style={styles.headerStyle}>
                  Questions {index + 1}
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    /{total}
                  </Text>
                </Title>
              </Body>
              <Right />
            </Header>
          </LinearGradient>
          <View padder style={[styles.pContainer, styles.pContainerAlign]}>
            <Segment style={{ backgroundColor: "transparent" }}>
              <Button
                transparent
                first
                style={{
                  height: 50,
                  backgroundColor:
                    previous === null || showResult ? "#9e9e9e" : light_dark,
                  borderColor:
                    previous === null || showResult ? "#9e9e9e" : light_dark,
                  borderRightColor: white,
                  marginTop: 20,
                }}
                disabled={previous === null || showResult}
                onPress={() =>
                  navigation.navigate("Quiz", { questionId: previous, title })
                }
              >
                <Icon
                  ios="ios-arrow-back"
                  android="md-arrow-back"
                  style={{ color: white }}
                />
                {/* <Text style={{ color: white }}>Previous</Text> */}
              </Button>
              <Button
                disabled={next === null || showResult}
                transparent
                last
                style={{
                  height: 50,
                  backgroundColor:
                    next === null || showResult ? "#9e9e9e" : light_dark,
                  borderColor:
                    next === null || showResult ? "#9e9e9e" : light_dark,
                  borderRightColor: white,
                  marginTop: 20,
                }}
                onPress={() =>
                  navigation.navigate("Quiz", { questionId: next, title })
                }
              >
                {/* <Text style={{ color: white }}>Next</Text> */}
                <Icon
                  ios="ios-arrow-forward"
                  android="md-arrow-forward"
                  style={{ color: white }}
                />
              </Button>
            </Segment>

            <CardFlip
              style={{ flex: showResult ? 2 : 1, marginBottom: 30 }}
              ref={(card) => {
                this.card = card;
              }}
            >
              <Item
                icon={"ios-return-right"}
                onPress={() => this.card.flip()}
                question={question.question}
              />
              <Item
                icon={"ios-return-left"}
                onPress={() => this.card.flip()}
                question={question.answer}
                answer={true}
              />
            </CardFlip>

            <View
              style={{
                flex: showResult ? 0.7 : 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              {showResult ? (
                <>
                  <Button
                    iconLeft
                    style={{
                      backgroundColor: light_dark,
                      justifyContent: "space-between",
                      width: 150,
                      paddingRight: 15,
                      height: 50,
                    }}
                    onPress={this.toDeckDetails}
                  >
                    <Icon
                      name="ios-arrow-back"
                      style={{ fontWeight: "bold" }}
                    />
                    <Text
                      style={{
                        color: white,
                        fontWeight: "bold",
                      }}
                    >
                      Back to Details
                    </Text>
                  </Button>
                  <Button
                    iconLeft
                    style={{
                      backgroundColor: light_dark,
                      justifyContent: "space-between",
                      width: 150,
                      paddingRight: 15,
                      height: 50,
                    }}
                    onPress={this.restartQuiz}
                  >
                    <Icon name="ios-refresh" style={{ fontWeight: "bold" }} />
                    <Text
                      style={{
                        color: white,
                        fontWeight: "bold",
                      }}
                    >
                      Restart
                    </Text>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    iconLeft
                    disabled={answer !== undefined}
                    style={{
                      backgroundColor:
                        answer !== undefined && !answer ? "#9e9e9e" : "#00C851",
                      justifyContent: "space-between",
                      width: 150,
                      paddingRight: 15,
                      height: 50,
                    }}
                    onPress={() => this.addResponse(true)}
                  >
                    <Icon
                      name="ios-checkmark"
                      style={{ fontWeight: "bold", fontSize: 30 }}
                    />
                    <Text
                      style={{
                        color: white,
                        fontWeight: "bold",
                      }}
                    >
                      Correct
                    </Text>
                  </Button>
                  <Button
                    disabled={answer !== undefined}
                    iconLeft
                    style={{
                      backgroundColor:
                        answer !== undefined && answer ? "#9e9e9e" : "#ff4444",
                      justifyContent: "space-between",
                      width: 150,
                      paddingRight: 15,
                      height: 50,
                    }}
                    onPress={() => this.addResponse(false)}
                  >
                    <Icon
                      name="ios-close"
                      style={{
                        marginRight: 5,
                        fontWeight: "bold",
                        fontSize: 30,
                      }}
                    />
                    <Text
                      style={{
                        color: white,
                        fontWeight: "bold",
                      }}
                    >
                      Incorrect
                    </Text>
                  </Button>
                </>
              )}
            </View>
            {isPending ? (
              <Spinner color={light_dark} />
            ) : showResult ? (
              <View style={{ flex: 1.3, marginBottom: 10 }}>
                <Text
                  style={{
                    color: light_dark,
                    fontWeight: "bold",
                    alignSelf: "center",
                    flex: 1,
                    fontSize: 20,
                  }}
                >
                  Your Score
                </Text>
                <ProgressBar
                  row
                  progress={numberTrueAnswer}
                  duration={500}
                  height={30}
                  barColor={"#00C851"}
                />
                <ProgressBar
                  row
                  progress={numberFalseAnswer}
                  duration={500}
                  height={30}
                  barColor={"#ff4444"}
                />
              </View>
            ) : null}
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

export default QuizScreen;
