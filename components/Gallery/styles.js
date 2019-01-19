import { StyleSheet } from "react-native";
import { TEXT_COLOR } from "../../theme";

const styles = StyleSheet.create({
  loaderWrapper: {
    alignItems: "center",
  },
  padding: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  selectedText: {
    color: TEXT_COLOR,
    fontSize: 16,
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
