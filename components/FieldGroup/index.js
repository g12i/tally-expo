import React, { PureComponent } from "react";
import { View } from "react-native";
import styles from "./styles";

class FieldGroup extends PureComponent {
  render() {
    const count = React.Children.count(this.props.children);

    return (
      <View style={styles.container}>
        {React.Children.map(this.props.children, (input, i) => (
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
