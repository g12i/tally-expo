import { StyleSheet } from "react-native";
import { TEXT_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  background: {
    width: "100%",
    height: 80,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  backgroundMask: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  nameText: {
    fontSize: 20,
    color: TEXT_COLOR,
  },
  counterText: {
    fontSize: 40,
    color: TEXT_COLOR,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  iconContainer: {
    display: "flex",
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-between",
  },
});

export default styles;
