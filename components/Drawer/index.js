import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Dimensions } from "react-native";
import { Spring, animated } from "react-spring/native";
import styles from "./styles";

const AnimatedView = animated(View);

export const Position = {
  Bottom: "Bottom",
  Right: "Right",
};

class Drawer extends PureComponent {
  windowDimensions = Dimensions.get("window");
  render() {
    const { children, position, visible } = this.props;
    return (
      <Spring
        native
        to={{
          x: visible ? 0 : this.windowDimensions[position === Position.Bottom ? "height" : "width"],
        }}
        config={{ tension: 220, friction: 30 }}
      >
        {({ x }) => (
          <AnimatedView
            style={{
              ...styles.container,
              transform: [
                {
                  [position === Position.Bottom ? "translateY" : "translateX"]: x.interpolate(
                    x => x
                  ),
                },
              ],
            }}
          >
            {children}
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
