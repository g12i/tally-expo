import { StyleSheet } from "react-native";
import { TEXT_COLOR, TEXT_PLACEHOLDER_COLOR, FORM_BACKGROUND_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: TEXT_COLOR,
  },
  value: {
    fontSize: 16,
    fontWeight: "400",
    color: TEXT_PLACEHOLDER_COLOR,
  },
  option: {
    height: 48,
    fontSize: 16,
    paddingHorizontal: 16,
    fontWeight: "400",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  optionText: {
    color: TEXT_COLOR,
  },
});

export default styles;
