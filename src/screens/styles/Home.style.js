import { StyleSheet } from "react-native";
import { white } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      justifyContent: "center",
      alignItems: "center",
    },
    flatList: {
      flex: 1,
    },
    header: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      padding: 0,
    },
    item: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      padding: 0,
    },
    headerTitle: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
    },
    gradient: {
      flex: 1,
    },
    containerStyle: {
      marginTop: 10,
    },
  });
  