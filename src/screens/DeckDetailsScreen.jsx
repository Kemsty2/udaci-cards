import React, { Component } from "react";
import {
  Container,
  Text,
  Button,
  Segment,
  CardItem,
  Card,
  Body,
  Icon,
  ListItem,
  Right,
  Separator,
} from "native-base";
import { SafeAreaView, View, StatusBar, SectionList } from "react-native";
import { white, light_dark, red } from "../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles/DeckDetails.style";
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import Spinner from "../components/Loader";

/**
 * Display details of the deckp
 */

const DATA = [
  {
    title: "List Of Cards",
    data: [],
  },
];

function HomeEffect() {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
    }, [])
  );

  return <StatusBar barStyle="light-content" backgroundColor="transparent" />;
}

function Item({ title, header }) {
  return (
    <ListItem
      style={{
        borderColor: "#bdbdbd",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        marginLeft: 0,
      }}
      onPress={() => alert("pressed")}
    >
      <Body
        style={{
          flex: 1,
          alignSelf: "flex-start",
          alignItems: "flex-start",
          padding: 10,
        }}
      >
        <Text style={{ marginLeft: 0, textAlign: "justify" }}>{title}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
}

class DeckDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      deck: {},
      questions: [
        {
          title: "List of Cards",
          data: [],
        },
      ],
    };
  }

  async componentDidMount() {
    const deck = await this.props.getDeck();
    let questions = this.state.questions;
    questions[0].data = [...deck.questions];
    console.log(deck);
    this.setState({
      deck,
      questions,
      isReady: true,
    });
  }

  renderNoContent = (section) => {
    if (section.data.length === 0) {
      return (
        <ListItem style={{ marginLeft: 0 }}>
          <Body>
            <Text style={{ textAlign: "center" }}>
              No Cards, Please Add Cards To This Deck
            </Text>
          </Body>
        </ListItem>
      );
    }
  };

  deleteDeck = async () => {
    const { deleteDeck } = this.props;

    await deleteDeck();

    this.toHome();
  };

  toHome = () => {
    this.props.navigation.dispatch(CommonActions.goBack());
  };

  render() {
    const { navigation, route } = this.props;
    const { deck, questions } = this.state;

    if (!this.state.isReady) {
      return <Spinner />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <HomeEffect />
        <Button
          transparent
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <Icon ios="ios-trash" android="md-trash" style={{ color: red }} />
        </Button>
        <Segment style={styles.segment}>
          <Button
            first
            onPress={() =>
              navigation.navigate(`Add Question`, {
                title: route.params.title,
              })
            }
            style={{
              flex: 2.5,
              marginLeft: 15,
              height: 50,
              backgroundColor: light_dark,
              borderColor: light_dark,
              borderRightColor: white,
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Text style={{ color: white, textAlign: "center" }}>
              Add Question
            </Text>
          </Button>
          <Button
            onPress={() =>
              navigation.navigate(`Quiz`, {
                title: route.params.title,
              })
            }
            style={{
              flex: 2,
              height: 50,
              backgroundColor: light_dark,
              borderColor: light_dark,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: white, textAlign: "center" }}>
              Start Quiz
            </Text>
          </Button>
          <Button
            transparent
            onPress={() =>
              navigation.navigate(`Add Deck`, {
                title: route.params.title,
              })
            }
            style={{
              flex: 1,
              height: 50,
              backgroundColor: white,
              borderColor: light_dark,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="edit" type="Entypo" style={{ color: light_dark }} />
          </Button>
          <Button
            last
            transparent
            onPress={this.deleteDeck}
            style={{
              flex: 1,
              height: 50,
              backgroundColor: white,
              borderColor: light_dark,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              marginRight: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="trash" type="Entypo" style={{ color: red }} />
          </Button>
        </Segment>

        <Container>
          <View style={{ flex: 1, backgroundColor: "transparent" }}>
            <Card style={styles.card}>
              <LinearGradient
                colors={["#141e30", "#243b55"]}
                style={styles.gradient}
              >
                <CardItem style={styles.cardItem}>
                  <Body style={styles.cardContainer}>
                    <View style={styles.firstContainer}>
                      <View style={styles.titleContainer}>
                        <Icon
                          style={styles.titleIcon}
                          name="ios-information-circle-outline"
                        />
                        <Text style={styles.title}>{deck.title}</Text>
                      </View>
                      <View style={styles.timeContainer}>
                        <Icon style={styles.timeIcon} name="ios-timer" />
                        <Text style={styles.timeValue}>
                          {new Date(deck.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.numCardsValueContainer}>
                      <Text style={styles.numCardsValue}>
                        {deck.questions.length}
                      </Text>
                      <Text style={styles.numCardsValuelabel}>Cards</Text>
                    </View>
                  </Body>
                </CardItem>
              </LinearGradient>
            </Card>

            <SectionList
              sections={questions}
              renderItem={({ item }) => <Item title={item.title} />}
              renderSectionHeader={({ section: { title } }) => (
                <Separator
                  bordered
                  style={{
                    shadowOffset: {
                      width: 0,
                      height: -10,
                    },
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,

                    elevation: 11,
                    borderColor: "transparent",
                    borderWidth: 0,
                    height: 50,
                    backgroundColor: light_dark,
                  }}
                >
                  <Text style={{ color: white, fontSize: 20 }}>{title}</Text>
                </Separator>
              )}
              renderSectionFooter={({ section }) =>
                this.renderNoContent(section)
              }
              keyExtractor={(item) => item.id}
              style={{}}
            />
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

export default DeckDetailsScreen;
