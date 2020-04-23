import "react-native-gesture-handler";
import React from "react";
import {
  Root,
  FooterTab,
  Footer,
  Text,
  Icon,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
} from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, Platform, StyleSheet } from "react-native";

import AddDeck from "../screens/AddDeckScreen";
import AddQuestion from "../screens/AddQuestionScreen";
import DeckDetails from "../screens/DeckDetailsScreen";
import Quiz from "../screens/QuizScreen";
import Home from "../screens/HomeScreen";

const AppNavigator = createStackNavigator();
const TabNavigator = createBottomTabNavigator();

const BottomNavigation = ({ state, descriptors, navigation }) => {
  return (
    <Footer>
      <FooterTab>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Button
              active={isFocused}
              vertical
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
            >
              <Icon ios={options.iosIcon} android={options.mdIcon} />
              <Text>{label}</Text>
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};

const AppStack = () => {
  return (
    <AppNavigator.Navigator
      initialRouteName={"Home"}
      options={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Header style={options.headerStyle}>
              <Left>
                {previous ? (
                  <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" />
                  </Button>
                ) : null}
              </Left>
              <Body>
                <Title>{title}</Title>
              </Body>
              <Right />
            </Header>
          );
        },
      }}
    >
      <AppNavigator.Screen
        name={"Home"}
        component={Home}
        options={{
          headerStyle: {
            ...styles.homeHeaderStyle,
          },
          headerTintColor: "#FFF",
        }}
      />
      <AppNavigator.Screen name={"Deck Details"} component={DeckDetails} />
      <AppNavigator.Screen name={"Add Question"} component={AddQuestion} />
      <AppNavigator.Screen name={"Quiz"} component={Quiz} />
    </AppNavigator.Navigator>
  );
};

const AppTab = () => {
  return (
    <TabNavigator.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
      <TabNavigator.Screen
        name="Home"
        component={AppStack}
        options={{ iosIcon: "ios-apps", mdIcon: "md-apps" }}
      />
      <TabNavigator.Screen
        name="Add Deck"
        component={AddDeck}
        options={{ iosIcon: "ios-add", mdIcon: "md-add" }}
      />
    </TabNavigator.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <AppTab />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeHeaderStyle: {
    backgroundColor: "#000",
  },
});
