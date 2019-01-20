import { StyleSheet } from "react-native";
import { TEXT_COLOR, TEXT_PLACEHOLDER_COLOR } from "../../theme";

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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "400",
    color: TEXT_PLACEHOLDER_COLOR,
  },
  icon: {
    marginLeft: 7,
    top: 1,
  },
});

export default styles;
