import { StyleSheet, Platform } from "react-native";
import { BACKGROUND_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    top: Platform.OS === "ios" ? 20 : 0,
    width: "100%",
    height: "100%",
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default styles;
