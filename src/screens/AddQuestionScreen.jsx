import React, { Component } from "react";
import { Container, Content, Text, Button } from "native-base";
import {StyleSheet} from "react-native";

/**
 * Display details of the deck
 */

class AddQuestionScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Content>
          <Text> Add Question Screen</Text>          
            <Button onPress={() => navigation.navigate(`Deck Details`)}>
              <Text>
              Go to Details
              </Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

export default AddQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
