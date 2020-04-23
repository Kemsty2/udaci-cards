import React, { Component } from "react";
import { Container, Content, Text } from "native-base";
import {StyleSheet} from "react-native";

/**
 * Display details of the deck
 */

class QuizScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text> Quiz Screen</Text>
        </Content>
      </Container>
    );
  }
}

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
