import { StyleSheet } from "react-native";
import { BORDER_COLOR, TEXT_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: TEXT_COLOR,
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
