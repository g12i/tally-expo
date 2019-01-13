import React, { PureComponent } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import Icon from "../Icon";
import Drawer, { Position } from "../Drawer";
import Header from "../Header";
import TextButton from "../TextButton";
import FieldGroup from "../FieldGroup";
import { BRAND_PRIMARY } from "../../theme";

const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

class Select extends PureComponent {
  state = {
    optionsVisible: false,
  };
  showOptions = () => this.setState({ optionsVisible: true });
  hideOptions = () => this.setState({ optionsVisible: false });
  onChange = value => () => {
    this.hideOptions();
    this.props.onChange(value);
  };
  getSelectedOption = () => {
    const { options, value } = this.props;
    return options.find(({ value: itemValue }) => itemValue === value);
  };
  render() {
    const { label, onChange, options = [], value } = this.props;
    const selectedOption = this.getSelectedOption();
    return (
      <React.Fragment>
        <Touchable style={styles.container} onPress={this.showOptions}>
          <React.Fragment>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>
              {selectedOption !== undefined ? selectedOption.label : "Choose"}{" "}
              <Icon name="arrow-forward" size={14} />
            </Text>
          </React.Fragment>
        </Touchable>
        <Drawer visible={this.state.optionsVisible} position={Position.Right}>
          <Header
            leftButton={<TextButton title="Back" icon="arrow-back" onPress={this.hideOptions} />}
            title={label}
            marginBottom={1}
          />
          <FieldGroup>
            {options.map(({ value: itemValue, label }) => (
              <Touchable
                style={styles.option}
                onPress={this.onChange(itemValue)}
                key={`option-${itemValue}`}
              >
                <Text style={styles.optionText}>{label}</Text>
                {value === itemValue && <Icon name="checkmark" color={BRAND_PRIMARY} size={20} />}
              </Touchable>
            ))}
          </FieldGroup>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default Select;
