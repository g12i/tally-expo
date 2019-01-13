import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Dimensions, Modal } from "react-native";
import { Spring, animated } from "react-spring/native";
import styles from "./styles";

const AnimatedView = animated(View);
const AnimatedModal = animated(Modal);

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
          visibility: visible ? 1 : 0,
        }}
        config={{ tension: 220, friction: 30 }}
      >
        {({ x, visibility }) => (
          <AnimatedModal visible={visibility.interpolate(x => !!x)} transparent>
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
          </AnimatedModal>
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
