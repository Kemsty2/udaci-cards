import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Button,
  ListItem,
  Spinner,
  Left,
  Body,
} from "native-base";
import {
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import DeckCard from "../components/DeckCard";
import { white } from "../utils/colors";

const datas = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
  Three: {
    title: "Three",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
  Four: {
    title: "Four",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
  Five: {
    title: "Five",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
  Six: {
    title: "Six",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
};

/**
 * display the title of each deck
 * display the number of cards in each deck
 */
function HomeEffect() {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("#ecf0f1");
    }, [])
  );

  return null;
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: [...Object.values(datas)],
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    if (item.header) {
      return (
        <ListItem itemDivider style={styles.header}>
          <Body>
            <Text style={styles.headerTitle}>{item.title}</Text>
          </Body>
        </ListItem>
      );
    }
    return (
      <DeckCard
        title={item.title}
        numberOfCards={item.questions.length}
        navigation={navigation}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <>
          <HomeEffect />
          <Spinner style={styles.spinner} />
        </>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <HomeEffect />
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{alignContent: "center"}}          
          style={styles.flatList}
        />
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    
  },
  spinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: white,
  },
  flatList: {
    flex: 1,    
  },
  header: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    padding: 0,
  },
  item: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    padding: 0,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  gradient: {
    flex: 1,
  },
});
