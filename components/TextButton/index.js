import noop from "lodash/noop";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Platform, Text, View } from "react-native";
import Icon from "../Icon";
import Touchable from "../Touchable";
import styles from "./styles";

class TextButton extends Component {
  static propTypes = {
    accessibilityLabel: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

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
    const formattedTitle = Platform.OS === "android" && title ? title.toUpperCase() : title;
    return (
      <Touchable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityStates={accessibilityStates}
        disabled={disabled}
        onPress={disabled ? noop : onPress}
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
