import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { View } from "react-native";
import styles from "./styles";

class ButtonGroup extends PureComponent {
  static propTypes = {
    active: PropTypes.number,
    children: PropTypes.node.isRequired,
  };
  static defaultProps = {
    active: -1,
  };
  render() {
    const { active, children } = this.props;
    const childLength = React.Children.count(children);

    return (
      <View style={styles.container}>
        {React.Children.map(children, (child, i) => {
          let buttonStyles = [styles.buttonWrapper];

          if (i === 0) buttonStyles.push(styles.first);
          if (i === childLength - 1) buttonStyles.push(styles.last);
          if (i === active) buttonStyles.push(styles.active);

          return (
            <View key={`child-${i}`} style={buttonStyles}>
              {React.cloneElement(child, {
                textStyle: styles.textStyles,
                buttonStyle: styles.buttonStyles,
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

export default ButtonGroup;
