import React, { Component } from "react";
import { Container, Content, Text } from "native-base";
import { StyleSheet, StatusBar, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SafeAreaView from "react-native-safe-area-view";

/**
 * Display details of the deck
 */

function AddDeckEffect() {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("#ecf0f1");
    }, [])
  );

  return null;
}

class AddDeckScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AddDeckEffect />
        <Container>
          <Content padder>
            <Text>Add Deck Screen</Text>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default AddDeckScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
});
