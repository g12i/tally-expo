import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Dimensions, Text } from "react-native";
import { Spring, animated } from "react-spring/native";
import styles from "./styles";

const AnimatedView = animated(View);
const AnimatedText = animated(Text);

export const Position = {
  Bottom: "Bottom",
  Right: "Right",
};

class Drawer extends Component {
  windowWidth = Dimensions.get("window").width;
  windowHeight = Dimensions.get("window").height;

  isHorizontalPosition = () => {
    return this.props.position === Position.Bottom;
  };

  getTargetDimension = () => {
    return this.isHorizontalPosition() ? this.windowHeight : this.windowWidth;
  };

  getTranslationAxis = () => {
    return this.isHorizontalPosition() ? "translateY" : "translateX";
  };

  render() {
    const { children, visible } = this.props;

    return (
      <Spring
        native
        to={{
          x: visible ? 0 : this.getTargetDimension(),
        }}
        config={{ tension: 220, friction: 30 }}
      >
        {({ x }) => (
          <AnimatedView
            style={{
              ...styles.container,
              transform: [
                {
                  [this.getTranslationAxis()]: x,
                },
              ],
            }}
          >
            {x.interpolate(x => x > 0).getValue() && children}
          </AnimatedView>
        )}
      </Spring>
    );
  }
}

Drawer.defaultProps = {
  visible: false,
  position: Position.Right,
};

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf([Position.Right, Position.Bottom]),
  visible: PropTypes.bool,
};

export default Drawer;
