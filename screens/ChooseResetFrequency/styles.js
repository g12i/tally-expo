import { StyleSheet } from "react-native";
import { TEXT_COLOR } from "../../theme";

const styles = StyleSheet.create({
  option: {
    height: 48,
    paddingHorizontal: 16,
    fontWeight: "400",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  optionText: {
    fontSize: 16,
    color: TEXT_COLOR,
  },
});

export default styles;
