import React from "react";
import { Spinner } from "native-base";
import { StyleSheet } from "react-native";
import {white} from "../utils/colors";

export default function Loader({ color }) {
  return <Spinner style={[styles.spinner]} color={color} />;
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: white,
  },
});
