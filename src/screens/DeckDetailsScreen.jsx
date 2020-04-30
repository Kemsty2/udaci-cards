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
import {
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { white, light_dark, red, grey } from "../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles/DeckDetails.style";
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import Spinner from "../components/Loader";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableHighlight } from "react-native-gesture-handler";

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

  return null;
}

function Item({ question }) {
  return (
    <TouchableHighlight
      style={{
        alignItems: "center",
        backgroundColor: "#e0e0e0",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        justifyContent: "center",
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "justify",
            color: light_dark,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {question}
        </Text>
      </View>
    </TouchableHighlight>
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

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      await this.props.getDeck();

      const {deck} = this.props;
      const {questions} = this.state;

      if (deck && deck.questions)
        questions[0].data = [...Object.values(deck.questions)];

      this.setState({
        questions: [...questions],
        isReady: true,
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    this.props.clearDeck();
  }

  deleteDeck = async () => {
    const { deleteDeck } = this.props;

    await deleteDeck();

    this.toHome();
  };

  toHome = () => {
    this.props.navigation.dispatch(CommonActions.goBack());
  };

  renderItem = ({ item }) => <Item question={item.question} hidden={false} />;

  renderHiddenItem = ({ item }, rowMap) => (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: grey,
        paddingLeft: 15,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          bottom: 0,
          position: "absolute",
          top: 0,
          width: 75,
          backgroundColor: white,
          borderLeftColor: light_dark,
          borderLeftWidth: 1,
          borderRightColor: light_dark,
          borderRightWidth: 1,
          borderBottomColor: light_dark,
          borderBottomWidth: 1,
          right: 75,
        }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Icon name="edit" type="Entypo" style={{ color: light_dark }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          bottom: 0,
          position: "absolute",
          top: 0,
          width: 75,
          backgroundColor: white,
          borderBottomColor: light_dark,
          borderBottomWidth: 1,
          right: 0,
        }}
        onPress={() => this.deleteRow(rowMap, item.id)}
      >
        <Icon name="trash" type="Entypo" style={{ color: red }} />
      </TouchableOpacity>
    </View>
  );

  renderSectionHeader = ({ section: { title } }) => (
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
  );

  renderSectionFooter = ({ section }) => {
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

  deleteCard = async () => {
    await this.props.deleteCard();
  };

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  deleteRow = (rowMap, rowKey) => {
    const listData = this.state.questions;

    this.closeRow(rowMap, rowKey);

    const newData = [...listData];
    const prevIndex = listData[0].data.findIndex(
      (item) => item.id === rowKey
    );
    newData[0].data.splice(prevIndex, 1);

    this.setState({
      questions: [...newData]
    });

    this.props.deleteCard(rowKey);
  };

  render() {
    const { navigation, route, deck } = this.props;
    const {questions} = this.state;        
    

    if (!this.state.isReady) {
      return <Spinner color={light_dark} />;
    }
    if (this.props.status === "pending") return <Spinner color={light_dark} />;

    return (
      <SafeAreaView style={styles.container}>
        <HomeEffect />
        <StatusBar barStyle="light-content" backgroundColor="transparent" />
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
              flex: 2.3,
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
            <Text style={{ color: white, textAlign: "center" }}>Add Card</Text>
          </Button>
          <Button
            onPress={() =>
              navigation.navigate(`Quiz`, {
                title: route.params.title,
              })
            }
            style={{
              flex: 2.3,
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
                        {questions[0].data.length}
                      </Text>
                      <Text style={styles.numCardsValuelabel}>Cards</Text>
                    </View>
                  </Body>
                </CardItem>
              </LinearGradient>
            </Card>

            <SwipeListView
              useSectionList
              sections={questions}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              renderSectionHeader={this.renderSectionHeader}
              renderSectionFooter={this.renderSectionFooter}
              keyExtractor={(item) => item.id}
              leftOpenValue={0}
              rightOpenValue={-150}
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

export default DeckDetailsScreen;
