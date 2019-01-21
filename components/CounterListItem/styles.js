import { StyleSheet } from "react-native";
import { TEXT_COLOR } from "../../theme";

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  contentContainer: {
    height: 85,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backgroundMock: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#232931",
  },
  backgroundMask: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.4)",
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
  },
  iconContainer: {
    position: "absolute",
    display: "flex",
    height: 85,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
