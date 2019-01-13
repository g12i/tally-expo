import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconWithText: {
    marginRight: 4,
    marginTop: 3,
  },
  text: {
    textAlign: "center",
    color: "#FD7014",
    fontSize: 18,
    fontWeight: "400",
  },
  textDisabled: {
    color: "#4B5057",
  },
});

export default styles;
