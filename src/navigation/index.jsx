import "react-native-gesture-handler";
import React from "react";
import {
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
  Container,
} from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AddDeck from "../screens/AddDeckScreen";
import AddQuestion from "../screens/AddQuestionScreen";
import DeckDetails from "../screens/DeckDetailsScreen";
import Quiz from "../screens/QuizScreen";
import Home from "../containers/HomeContainer";
import { white, grey } from "../utils/colors";

const AppNavigator = createStackNavigator();
const TabNavigator = createBottomTabNavigator();

const BottomNavigation = ({ state, descriptors, navigation }) => {
  return (
    <Footer>
      <LinearGradient colors={["#141e30", "#243b55"]} style={styles.gradient}>
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
                vertical
                onPress={onPress}
                onLongPress={onLongPress}
                key={index}
                style={{ color: isFocused ? white : grey }}
              >
                <Icon
                  ios={options.iosIcon}
                  android={options.mdIcon}
                  style={{ color: isFocused ? white : grey }}
                />
                <Text style={{ color: isFocused ? white : grey }}>{label}</Text>
              </Button>
            );
          })}
        </FooterTab>
      </LinearGradient>
    </Footer>
  );
};

const AppStack = () => {
  return (
    <AppNavigator.Navigator
      initialRouteName={"Home"}
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          const hasSegment = title === "Deck Details";
          const hasSpan = title === "Add Question" || "Quiz";

          return (
            <LinearGradient colors={["#141e30", "#243b55"]}>
              <Header
                style={[
                  options.headerStyle,
                  /* { marginTop: StatusBar.currentHeight }, */
                ]}
                hasSegment={hasSegment}
                span={hasSpan}
              >
                <Left>
                  {previous ? (
                    <Button transparent onPress={() => navigation.goBack()}>
                      <Icon name="arrow-back" style={{ color: white }} />
                    </Button>
                  ) : null}
                </Left>
                <Body>
                  <Title style={{ color: white }}>{title}</Title>
                </Body>
                <Right />
              </Header>
            </LinearGradient>
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
      <AppNavigator.Screen
        name={"Deck Details"}
        component={DeckDetails}
        options={{
          headerStyle: {
            ...styles.homeHeaderStyle,
          },
          headerTintColor: "#FFF",
        }}
      />
      <AppNavigator.Screen
        name={"Add Question"}
        component={AddQuestion}
        options={{
          headerTintColor: "#FFF",
          headerStyle: {
            ...styles.addQuestionStyle,
          },
          headerShown: false,
        }}
      />
      <AppNavigator.Screen
        name={"Quiz"}
        component={Quiz}
        options={{
          headerTintColor: "#FFF",
          headerStyle: {
            ...styles.addQuestionStyle,
          },
          headerShown: false,
        }}
      />
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
    backgroundColor: "transparent",
    height: 60,
  },
  addQuestionStyle: {
    backgroundColor: "transparent",
  },
  gradient: {
    flex: 1,
  },
  btnFilter: { color: white, fontSize: 30, fontWeight: "700" },
});
