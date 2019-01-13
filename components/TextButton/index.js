import React, { Component } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Icon from "../Icon";

const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

class TextButton extends Component {
  render() {
    const { accessibilityLabel, onPress, title, icon, disabled } = this.props;
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    const accessibilityStates = [];
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
      accessibilityStates.push("disabled");
    }
    const formattedTitle = Platform.OS === "android" ? title.toUpperCase() : title;
    return (
      <Touchable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityStates={accessibilityStates}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={buttonStyles}>
          {icon && <Icon name={icon} color={styles.text.color} size={28} />}
          {title && (
            <Text style={textStyles} disabled={disabled}>
              {icon && " "}
              {formattedTitle}
            </Text>
          )}
        </View>
      </Touchable>
    );
  }
}

export default TextButton;
