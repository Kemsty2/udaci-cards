import React from "react";
import { Card, CardItem, Body, Text, Icon, Right } from "native-base";
import { View, StyleSheet } from "react-native";
import { blue_lighteen } from "../utils/colors";
import { LinearGradient } from "expo-linear-gradient";

export default function DeckCard({ title, numberOfCards, navigation }) {
  return (
    <Card
      style={{ backgroundColor: "transparent", borderColor: "transparent" }}
    >
      <LinearGradient colors={["#141e30", "#243b55"]} style={styles.gradient}>
        <CardItem
          style={styles.cardItem}
          button
          onPress={() => navigation.navigate(`Deck Details`)}
        >
          <Body style={styles.row}>
            <Icon active name="ios-apps" style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
            <Right>
              <View style={styles.column}>
                <Text style={styles.metrics}>{numberOfCards}</Text>
                <Text style={styles.metricTitle}>Cards</Text>
              </View>
            </Right>
          </Body>
        </CardItem>
      </LinearGradient>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    color: blue_lighteen,
    fontSize: 24,
    fontWeight: "bold",
    flex: 2,
  },
  metrics: {
    fontSize: 36,
    color: blue_lighteen,
  },
  metricTitle: {
    color: blue_lighteen,
    fontSize: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    marginRight: 20,
    fontSize: 40,
    color: blue_lighteen,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  cardItem: {
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
