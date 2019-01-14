import React, { PureComponent } from "react";
import { Text } from "react-native";
import styles from "./styles";

import Icon from "../Icon";
import Touchable from "../Touchable";

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
      <Touchable style={styles.container} onPress={onPressLabel}>
        <React.Fragment>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>
            {selectedOption !== undefined ? selectedOption.label : "Choose"}{" "}
            <Icon name="arrow-forward" size={14} />
          </Text>
        </React.Fragment>
      </Touchable>
    );
  }
}

Select.defaultProps = {
  options: [],
  label: "",
  onPressLabel: () => {},
};

export default Select;
