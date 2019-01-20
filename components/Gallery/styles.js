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
    borderRadius: 5,
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
  author: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    top: "auto",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});

export default styles;
