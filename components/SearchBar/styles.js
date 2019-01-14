import { StyleSheet } from "react-native";
import {
  TEXT_COLOR,
  TEXT_PLACEHOLDER_COLOR,
  FORM_BACKGROUND_COLOR,
  BACKGROUND_COLOR,
} from "../../theme";
import { red } from "ansi-colors";

const styles = StyleSheet.create({
  wrapper: {
    height: 36,
    backgroundColor: FORM_BACKGROUND_COLOR,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: TEXT_PLACEHOLDER_COLOR,
  },
  input: {
    height: "100%",
    marginLeft: 6,
    backgroundColor: "red",
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
    color: TEXT_COLOR,
  },
  placeholder: {
    color: TEXT_PLACEHOLDER_COLOR,
  },
  clearIconTouchable: {
    height: "100%",
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  clearIcon: {
    left: 1,
    top: 1,
    color: TEXT_PLACEHOLDER_COLOR,
  },
});

export default styles;
