import { StyleSheet } from "react-native";
import { TEXT_COLOR, TEXT_PLACEHOLDER_COLOR, FORM_BACKGROUND_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    height: 48,
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  input: {
    height: 48,
    fontSize: 16,
    fontWeight: "400",
    width: "100%",
    color: TEXT_COLOR,
  },
  placeholder: {
    color: TEXT_PLACEHOLDER_COLOR,
  },
});

export default styles;
