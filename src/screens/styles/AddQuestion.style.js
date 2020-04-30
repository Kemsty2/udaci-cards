import {StyleSheet} from "react-native";
import {white, light_dark } from "../../utils/colors"

export const styles = StyleSheet.create({
    kbdAvoidingViewStyle: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    iconBack: {
      color: white,
      fontWeight: "bold",
    },
    gradient: {},
    headerStyle: {
      color: white,
      fontWeight: "bold",
      fontSize: 24,
      textAlign: "center",
      width: 200,
    },
    innerContainer: {
      flex: 2,
      justifyContent: "flex-start",
    },
    pContainer: {
      borderTopColor: white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      borderTopWidth: 2,
      borderStyle: "solid",
      marginTop: -20,
      zIndex: 9999,
      backgroundColor: white,
    },
    pContainerAlign: {
      flex: 1,
      /* width: Math.round(Dimensions.get("window").width) - 25, */
      justifyContent: "center",
      alignItems: "center",
    },
  
    formTitle: {
      position: "absolute",
      top: 50,
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    btnSubmit: {
      backgroundColor: light_dark,
    },
    btnText: {
      color: white,
      fontSize: 18,
      fontWeight: "bold",
    },
  });