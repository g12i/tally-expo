import { StyleSheet } from "react-native";
import { TEXT_COLOR, TEXT_PLACEHOLDER_COLOR, FORM_BACKGROUND_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: FORM_BACKGROUND_COLOR,
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  input: {
    height: 45,
    width: "100%",
    fontSize: 14,
    color: TEXT_COLOR,
  },
  placeholder: {
    color: TEXT_PLACEHOLDER_COLOR,
  },
});

export default styles;
