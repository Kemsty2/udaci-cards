import { StyleSheet } from "react-native";
import { white, red, light_green } from "../../utils/colors";

export const cardStyle = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    marginBottom:20 ,
    marginTop: 20,
    height: 200,
  },
  divider: {    
    width: 1,
    height: 200,
    backgroundColor: white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
  },
  cardItem: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "transparent",
    flex: 1,    
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
    flex: 4,
    flexDirection: "column",
    backgroundColor: "transparent",    
    /* borderColor: "#d50000",
    borderStyle: "solid",
    borderWidth: 1 */
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  title: {
    flex: 1,
    color: white,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold"
  },
  titleIcon: {
    flex: 1,
    color: white,
  },
  secondContainer: {
    flex: 1,    
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",    
    height: 200
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconBack: {
    color: white,
    fontWeight: "bold",
  },
  iconEdit: {
    color: light_green,
    fontWeight: "bold",
  },
  iconTrash: {
    color: red,
    fontWeight: "bold",
  },
  gradient: {},
  headerStyle: {
    marginRight: 20,
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
    /* justifyContent: "center", */
    /* alignItems: "center", */    
  },
});
