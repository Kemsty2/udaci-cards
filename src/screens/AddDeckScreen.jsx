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
import {
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SafeAreaView from "react-native-safe-area-view";
import { white, light_dark, red } from "../utils/colors";
import { validate } from "../utils/validate";
import { LinearGradient } from "expo-linear-gradient";
import { Field, reduxForm } from "redux-form";
import Spinner from "../components/Loader";

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
    setTimeout(() => {
      this.setState({
        isReady: true,
      });
    }, 3000);
  }

  renderInput = ({ input, label, type, meta: { touched, error, warning } }) => {
    var hasError = false;
    if (error !== "undefined") {
      hasError = true;
    }

    return (
      <Item rounded error={hasError} style={styles.formField}>
        <Input {...input} placeholder={label} />
        {hasError ? (
          <Text style={{ color: red, marginRight: 5 }}>{error}</Text>
        ) : (
          <Text />
        )}
      </Item>
    );
  };

  render() {
    const { handleSubmit, reset, navigation } = this.props;

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
              <Field name="title" label="Title" component={this.renderInput} />
              <Button onPress={reset} rounded block style={styles.btnSubmit}>
                <Text style={styles.btnText}>Create</Text>
              </Button>
            </Content>
          </Container>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default reduxForm({ form: "Add Deck", validate })(AddDeckScreen);

const styles = StyleSheet.create({
  kbdAvoidingViewStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  iconBack: {
    color: white,
    fontWeight: "bold",
  },
  gradient: {},
  headerStyle: {
    color: white,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
  },
  innerContainer: {
    marginLeft: 10,
  },
  pContainer: {
    borderTopColor: white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderTopWidth: 2,
    borderStyle: "solid",
    marginTop: -20,
    zIndex: 9999,
    backgroundColor: white,
  },
  pContainerAlign: {
    flex: 1,
    /* width: Math.round(Dimensions.get("window").width) - 25, */
    justifyContent: "center",
    alignItems: "center",
  },
  formField: {
    marginBottom: 40,
  },
  formTitle: {
    position: "absolute",
    top: 50,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  btnSubmit: {
    backgroundColor: light_dark,
  },
  btnText: {
    color: white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
