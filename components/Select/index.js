import React, { PureComponent } from "react";
import { Text } from "react-native";
import { GestureHandler } from "expo";
import styles from "./styles";

import Icon from "../Icon";

const { RectButton } = GestureHandler;

class Select extends PureComponent {
  onChange = value => () => {
    this.props.onChange(value);
  };
  getSelectedOption = () => {
    const { options, value } = this.props;
    return options.find(({ value: itemValue }) => itemValue === value);
  };
  render() {
    const { label, onPressLabel } = this.props;
    const selectedOption = this.getSelectedOption();
    return (
      <RectButton style={styles.container} onPress={onPressLabel}>
        <React.Fragment>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>
            {selectedOption !== undefined ? selectedOption.label : "Choose"}{" "}
            <Icon name="arrow-forward" size={14} />
          </Text>
        </React.Fragment>
      </RectButton>
    );
  }
}

Select.defaultProps = {
  options: [],
  label: "",
  onPressLabel: () => {},
};

export default Select;
