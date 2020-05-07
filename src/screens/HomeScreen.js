import React, { Component } from "react";
import { Text, ListItem, Body, Icon } from "native-base";
import {
  StatusBar,
  Platform,
  SafeAreaView,
  FlatList,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import DeckCard from "../components/DeckCard";
import { light_dark } from "../utils/colors";
import Spinner from "../components/Loader";
import { styles } from "./styles/Home.style";
import _ from "lodash";

/**
 * display the title of each deck
 * display the number of cards in each deck
 */
function HomeEffect() {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor(light_dark);
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

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      await this.props.listDecks();
      this.setState({
        isLoading: false,
      });
    });
  }

  componentWillUnmount(){
    this._unsubscribe();
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
        numberOfCards={
          item && item.questions ? Object.values(item.questions).length : 0
        }
        onPress={() =>
          navigation.navigate("Deck Details", {
            title: item.title,
          })
        }
      />
    );
  };

  render() {
    const { status, listOfDecks } = this.props;
    let data = [];
    data = _.orderBy(Object.values(listOfDecks), ["createdAt"], ["desc"]);

    if (this.state.isLoading) {
      return (
        <>
          <HomeEffect />
          <Spinner color={light_dark} />
        </>
      );
    }

    if (Object.values(listOfDecks).length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <HomeEffect />
          <Icon
            ios="ios-sad"
            android="md-sad"
            style={{ fontSize: 75, color: light_dark }}
          />
          <Text style={{ fontSize: 18 }}>
            No Decks Found Please, Add Some Deck ⤵
          </Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>        
        {status === "pending" ? (
          <Spinner color={light_dark} />
        ) : (
          <>
            <HomeEffect />
            <FlatList
              data={data}
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
