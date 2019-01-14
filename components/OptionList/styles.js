import { StyleSheet } from "react-native";
import { BORDER_COLOR, FORM_BACKGROUND_COLOR, TEXT_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: FORM_BACKGROUND_COLOR,
    borderTopColor: BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  option: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "400",
    color: TEXT_COLOR,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
    marginLeft: 16,
    backgroundColor: BORDER_COLOR,
  },
});

export default styles;
