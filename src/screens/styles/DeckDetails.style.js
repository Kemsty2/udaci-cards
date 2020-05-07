import { StyleSheet } from "react-native";
import { white, light_dark } from "../../utils/colors";
import {Platform} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: white,
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
  },
  segment: {
    backgroundColor: "transparent",
    marginBottom: 20,
    /* shadowColor: light_dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9, */
    height: 80,        
  },
  card: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    marginLeft: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    height: Platform.OS === "ios" ? 100 : 120,
    marginBottom: 20,
  },
  cardItem: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  firstContainer: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    flex: 5,
    color: white,
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  titleIcon: {
    flex: 1,
    color: white,
  },
  numCardsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  numCardsTitle: {
    flex: 1,
    color: white,
  },
  numCardsValueContainer: {
    flex: 1,
    flexDirection: "column",
  },
  numCardsValue: {
    flex: 2,
    color: white,
    fontSize: 48,
    fontWeight: "bold",
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  numCardsValuelabel: {
    flex: 1,
    color: white,
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 10,
    backgroundColor: "transparent",
  },
  timeIcon: {
    flex: 1,
    color: white,
  },
  timeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  timeValue: {
    flex: 5,
    color: white,
  },
  questionsContainer: {
    marginTop: 10,
    shadowColor: light_dark,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    backgroundColor: "#FFF",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
