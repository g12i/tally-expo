import { StyleSheet } from "react-native";
import { BRAND_PRIMARY, TEXT_DISABLED_COLOR } from "../../theme";

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: BRAND_PRIMARY,
    fontSize: 18,
    fontWeight: "400",
  },
  textDisabled: {
    color: TEXT_DISABLED_COLOR,
  },
});

export default styles;
