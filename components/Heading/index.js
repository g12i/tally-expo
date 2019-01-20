import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text } from "react-native";
import styles from "./styles";

export default class Heading extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    level: PropTypes.oneOf([1, 2, 3]).isRequired,
  };

  render() {
    const { children, level } = this.props;
    return <Text style={[styles.heading, styles[`level${level}`]]}>{children}</Text>;
  }
}
