import React, { PureComponent } from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

class Icon extends PureComponent {
  render() {
    const { name, ...props } = this.props;
    return <Ionicons name={Platform.OS === "ios" ? `ios-${name}` : `md-${name}`} {...props} />;
  }
}

export default Icon;
