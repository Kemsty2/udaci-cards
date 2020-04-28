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
import { white, light_dark } from "../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles/DeckDetails.style";
import { useFocusEffect } from "@react-navigation/native";
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
    };
  }

  componentDidMount() {
    this.setState({
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

  render() {
    if (!this.state.isReady) {
      return <Spinner />;
    }
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <HomeEffect />
        <Segment style={styles.segment}>
          <Button
            first
            onPress={() => navigation.navigate(`Add Question`)}
            style={{
              flex: 1,
              marginLeft: 20,
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
            last
            onPress={() => navigation.navigate(`Quiz`)}
            style={{
              flex: 1,
              marginRight: 20,
              height: 50,
              backgroundColor: light_dark,
              borderColor: light_dark,
              alignItems: "center",
              justifyContent: "center",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Text style={{ color: white, textAlign: "center" }}>
              Start Quiz
            </Text>
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
                        <Text style={styles.title}>Deck Title</Text>
                      </View>
                      <View style={styles.timeContainer}>
                        <Icon style={styles.timeIcon} name="ios-timer" />
                        <Text style={styles.timeValue}>{"At 28/12/2018"}</Text>
                      </View>
                    </View>
                    <View style={styles.numCardsValueContainer}>
                      <Text style={styles.numCardsValue}>{3}</Text>
                      <Text style={styles.numCardsValuelabel}>Cards</Text>
                    </View>
                  </Body>
                </CardItem>
              </LinearGradient>
            </Card>

            <SectionList
              sections={DATA}
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
