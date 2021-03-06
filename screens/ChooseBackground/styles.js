import { StyleSheet } from "react-native";
import { TEXT_COLOR, BACKGROUND_COLOR } from "../../theme";

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 16,
  },
  screen: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  notFoundWrapper: {
    flex: 1,
    alignItems: "center",
  },
  notFoundText: {
    color: TEXT_COLOR,
    fontSize: 18,
  },
});

export default styles;
