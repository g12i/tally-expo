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
          let buttonWrapperStyles = [styles.buttonWrapper];

          if (i === 0) buttonWrapperStyles.push(styles.first);
          if (i === childLength - 1) buttonWrapperStyles.push(styles.last);
          if (i === active) buttonWrapperStyles.push(styles.active);

          let textStyle = [styles.textStyles];
          if (i === active) textStyle.push(styles.activeText);

          return (
            <View key={`child-${i}`} style={buttonWrapperStyles}>
              {React.cloneElement(child, {
                textStyle,
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
