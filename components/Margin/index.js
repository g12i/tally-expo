import React from "react";
import { View } from "react-native";

function Margin({ children, top = 0, right = 0, bottom = 0, left = 0 }) {
  return (
    <View
      style={{
        marginTop: 16 * top,
        marginRight: 16 * right,
        marginBottom: 16 * bottom,
        marinLeft: 16 * left,
      }}
    >
      {children}
    </View>
  );
}

export default Margin;
