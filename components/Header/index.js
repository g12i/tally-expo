import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

function Header({ leftButton = null, rightButton = null, title, marginBottom = 0 }) {
  return (
    <View style={{ ...styles.container, marginBottom: marginBottom * 16 }}>
      <View style={styles.leftButton}>{leftButton}</View>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.rightButton}>{rightButton}</View>
    </View>
  );
}

export default Header;
