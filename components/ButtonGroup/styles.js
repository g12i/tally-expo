import { StyleSheet } from "react-native";
import { BRAND_PRIMARY } from "../../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 32,
  },
  buttonWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BRAND_PRIMARY,
    flex: 1,
    alignItems: "center",
  },
  buttonStyles: {
    paddingVertical: 6,
  },
  textStyles: {
    fontSize: 14,
    fontWeight: "300",
  },
  last: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  first: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  active: {
    backgroundColor: BRAND_PRIMARY,
  },
  activeText: {
    color: "#fff",
    fontWeight: "400",
  },
});

export default styles;
