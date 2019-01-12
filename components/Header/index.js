import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

function Header({ leftButton = null, rightButton = null, title }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftButton}>{leftButton}</View>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.rightButton}>{rightButton}</View>
    </View>
  );
}

export default Header;
