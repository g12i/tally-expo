import React, { PureComponent } from "react";
import { View } from "react-native";
import styles from "./styles";

class FieldGroup extends PureComponent {
  render() {
    const { children, marginBottom = 1, marginTop = 0 } = this.props;
    const count = React.Children.count(children);

    return (
      <View
        style={{
          ...styles.container,
          marginBottom: 16 * marginBottom,
          marginTop: 16 * marginTop,
        }}
      >
        {React.Children.map(children, (input, i) => (
          <React.Fragment key={`input-${i}`}>
            <View style={styles.item}>{input}</View>
            {count > 1 && i < count - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </View>
    );
  }
}

export default FieldGroup;
