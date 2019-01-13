import React, { PureComponent } from "react";
import { View, Text, TextInput as NativeTextInput } from "react-native";
import styles from "./styles";

class TextInput extends PureComponent {
  render() {
    const { placeholder, onChangeText, value } = this.props;
    const inputProps = { placeholder, onChangeText, value };
    return (
      <View style={styles.container}>
        <NativeTextInput
          style={styles.input}
          placeholderTextColor={styles.placeholder.color}
          {...inputProps}
        />
      </View>
    );
  }
}

export default TextInput;
