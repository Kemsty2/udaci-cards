import React, { Component } from "react";
import { Text, ListItem, Body } from "native-base";
import {
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import DeckCard from "../components/DeckCard";
import { white, light_dark } from "../utils/colors";
import Spinner from "../components/Loader";
import { styles } from "./styles/Home.style";

/**
 * display the title of each deck
 * display the number of cards in each deck
 */
function HomeEffect() {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
    }, [])
  );

  return null;
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    await this.props.listDecks();
    this.setState({
      isLoading: false,
    });
    console.log(this.props.listOfDecks);
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
        numberOfCards={item && item.questions ? item.questions.length : 0}
        onPress={() =>
          navigation.navigate("Deck Details", {
            title: item.title,
          })
        }
      />
    );
  };

  render() {
    const { status } = this.props;

    if (this.state.isLoading) {
      return (
        <>
          <HomeEffect />
          <Spinner color={light_dark} />
        </>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" />
        {status === "pending" ? (
          <Spinner color={light_dark} />
        ) : (
          <>
            <HomeEffect />
            <FlatList
              data={this.props.listOfDecks}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.title}
              stickyHeaderIndices={[0]}
              style={styles.flatList}
              contentContainerStyle={styles.containerStyle}
            />
          </>
        )}
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
