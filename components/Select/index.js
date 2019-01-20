import isNil from "lodash/isNil";
import isString from "lodash/isString";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import Icon from "../Icon";
import Touchable from "../Touchable";
import styles from "./styles";

class Select extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    value: PropTypes.node,
  };

  static defaultProps = {
    label: "",
    onPress: noop,
    value: null,
  };

  renderValue = () => {
    const { value } = this.props;
    if (isNil(value)) return <Text style={styles.valueText}>Choose</Text>;
    if (isString(value)) return <Text style={styles.valueText}>{value}</Text>;
    return value;
  };

  render() {
    const { label, onPress } = this.props;
    return (
      <Touchable style={styles.container} onPress={onPress}>
        <React.Fragment>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.value}>
            {this.renderValue()}
            <Icon name="arrow-forward" size={14} style={[styles.valueText, styles.icon]} />
          </View>
        </React.Fragment>
      </Touchable>
    );
  }
}

export default Select;
