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
  header: {
    color: TEXT_COLOR,
    fontSize: 34,
    fontWeight: "700",
  },
  loaderWrapper: {
    alignItems: "center",
  },
  pictureWrapper: {
    width: 200,
    height: 200,
  },
  picture: {},
});

export default styles;
