import React, { Component } from "react";
import { Container, Content, Text, Button } from "native-base";
import { StyleSheet } from "react-native";

/**
 * Display details of the deck
 */

class DeckDetailsScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Content>
          <Text>Deck Details</Text>
          <Button onPress={() => navigation.navigate(`Add Question`)}>
            <Text>Go to Add Question</Text>
          </Button>
          <Button onPress={() => navigation.navigate(`Quiz`)}>
            <Text>Go to Quiz</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default DeckDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
