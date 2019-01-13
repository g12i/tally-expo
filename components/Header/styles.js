import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#393E46",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  leftButton: {
    position: "absolute",
    left: 0,
  },
  rightButton: {
    position: "absolute",
    right: 0,
  },
});

export default styles;