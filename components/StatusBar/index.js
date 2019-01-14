import React from "react";
import { View, StatusBar as NativeStatusBar } from "react-native";

export default function StatusBar({ backgroundColor, barStyle }) {
  return (
    <View style={{ backgroundColor }}>
      <NativeStatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
    </View>
  );
}
