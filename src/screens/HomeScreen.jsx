import React, { Component } from "react";
import { Container, Content, Text, Button } from "native-base";
import { StyleSheet, StatusBar, Platform, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";

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
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <HomeEffect />
        <Container>
          <Content padder>
            <View style={styles.container}>
              <Text>Deck List View</Text>

              <Button
                onPress={() => navigation.navigate(`Deck Details`)}
                block={false}
              >
                <Text> Go To Deck Details</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
