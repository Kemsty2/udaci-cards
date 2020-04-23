import React from "react";
import { View, Text } from "react-native";

export default function DeckCard({ title }) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
