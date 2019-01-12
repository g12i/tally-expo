import React from "react";
import { View, StatusBar as NativeStatusBar, Platform } from "react-native";

export default function StatusBar({ backgroundColor, barStyle }) {
  const height = Platform.OS === "ios" ? 20 : 0;
  return (
    <View style={{ height, backgroundColor }}>
      <NativeStatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
    </View>
  );
}
