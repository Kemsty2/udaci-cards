import React, { Component } from "react";
import {
  Container,
  Content,
  Right,
  Left,
  Header,
  Title,
  Button,
  Icon,
  Body,
  Item,
  Input,
} from "native-base";
import { StatusBar, Platform, Text, KeyboardAvoidingView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SafeAreaView from "react-native-safe-area-view";
import { light_dark, red } from "../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "../components/Loader";
import { styles } from "./styles/AddDeck.style";
import AddDeckForm from "../components/forms/AddDeckForm";
import { CommonActions } from "@react-navigation/native";

/**
 * Display details of the deck
 */

function AddDeckEffect() {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("#ecf0f1");
    }, [])
  );

  return null;
}

class AddDeckScreen extends Component {
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

  renderInput = ({
    input,
    label,
    type,
    meta: { touched, error, warning, valid },
  }) => {
    var hasError = false;
    if (error !== "undefined") {
      hasError = true;
    }

    return (
      <Item rounded error={hasError} success={valid} style={styles.formField}>
        <Input {...input} placeholder={label} />
        {hasError ? (
          <Text style={{ color: red, marginRight: 5 }}>{error}</Text>
        ) : (
          <Text />
        )}
      </Item>
    );
  };

  submit = async (values) => {
    await this.props.saveDeck(values.title);
    this.toHome();
  };

  toHome = () => {
    this.props.navigation.dispatch(CommonActions.goBack());
  };

  render() {
    const { navigation, status } = this.props;

    if (!this.state.isReady) {
      return <Spinner color={light_dark} />;
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "position" : "height"}
        contentContainerStyle={styles.kbdAvoidingViewStyle}
        keyboardVerticalOffset={-80}
      >
        {status === "pending" ? (
          <Spinner color={light_dark} />
        ) : (
          <SafeAreaView style={styles.container}>
            <AddDeckEffect />
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
                    <Title style={styles.headerStyle}>Add Deck</Title>
                  </Body>
                  <Right />
                </Header>
              </LinearGradient>

              <Content
                padder
                style={styles.pContainer}
                contentContainerStyle={styles.pContainerAlign}
              >
                <Text style={styles.formTitle}>
                  What is the title of the new Deck ?
                </Text>
                <AddDeckForm
                  text="Create"
                  renderInput={this.renderInput}
                  styles={styles}
                  onSubmit={this.submit}
                />
              </Content>
            </Container>
          </SafeAreaView>
        )}
      </KeyboardAvoidingView>
    );
  }
}

export default AddDeckScreen;
