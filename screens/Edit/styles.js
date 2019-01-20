import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    width: "100%",
    height: "100%",
  },
  backgroundPreview: {
    width: 26,
    height: 26,
    borderRadius: 2,
  },
});

export default styles;
