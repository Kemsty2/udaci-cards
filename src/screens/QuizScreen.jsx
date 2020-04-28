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
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isReady: true,
      });
    }, 1000);
  }

  flip = () => {
    this.card.flip();
  };

  render() {
    const { navigation } = this.props;

    if (!this.state.isReady) {
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
                <Button transparent onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" style={styles.iconBack} />
                </Button>
              </Left>
              <Body style={styles.innerContainer}>
                <Title style={styles.headerStyle}>
                  Questions {1}
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>/{10}</Text>
                </Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon
                    name="edit"
                    type="FontAwesome5"
                    style={styles.iconEdit}
                  />
                </Button>
                <Button transparent>
                  <Icon
                    name="trash"
                    type="FontAwesome5"
                    style={styles.iconTrash}
                  />
                </Button>
              </Right>
            </Header>
          </LinearGradient>
          <View padder style={[styles.pContainer, styles.pContainerAlign]}>
            <Segment style={{ backgroundColor: "transparent" }}>
              <Button
                transparent
                first
                style={{
                  height: 50,
                  backgroundColor: light_dark,
                  borderColor: light_dark,
                  borderRightColor: white,
                  marginTop: 20,
                }}
              >
                <Icon
                  ios="ios-arrow-back"
                  android="md-arrow-back"
                  style={{ color: white }}
                />
                {/* <Text style={{ color: white }}>Previous</Text> */}
              </Button>
              <Button
                transparent
                last
                style={{
                  height: 50,
                  backgroundColor: light_dark,
                  borderColor: light_dark,
                  borderRightColor: white,
                  marginTop: 20,
                }}
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
              style={{ flex: 1, marginBottom: 30 }}
              ref={(card) => {
                this.card = card;
              }}
            >
              <Item
                icon={"ios-return-right"}
                onPress={() => this.card.flip()}
                question={"Does React Native Work on Android ?"}
              />
              <Item
                icon={"ios-return-left"}
                onPress={() => this.card.flip()}
                question={"YES!"}
                answer={true}
              />
            </CardFlip>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                iconLeft
                style={{
                  backgroundColor: "#00C851",
                  justifyContent: "space-between",
                  width: 150,
                  paddingRight: 15,
                  height: 50,
                }}
              >
                <Icon name="ios-checkmark" style={{ fontWeight: "bold" }} />
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
                iconLeft
                style={{
                  backgroundColor: "#ff4444",
                  justifyContent: "space-between",
                  width: 150,
                  paddingRight: 15,
                  height: 50,
                }}
              >
                <Icon
                  name="ios-close"
                  style={{ marginRight: 5, fontWeight: "bold" }}
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

              {/* <Button
                iconLeft
                style={{
                  backgroundColor: light_dark,
                  justifyContent: "space-between",
                  width: 150,
                  paddingRight: 15,
                  height: 50,
                }}
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
              </Button> */}
            </View>
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

export default QuizScreen;
