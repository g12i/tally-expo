import { StyleSheet } from "react-native";
import { FORM_BACKGROUND_COLOR, BORDER_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: FORM_BACKGROUND_COLOR,
    borderTopColor: BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  item: {
    height: 48,
    justifyContent: "center",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    marginLeft: 16,
    backgroundColor: BORDER_COLOR,
  },
});

export default styles;
