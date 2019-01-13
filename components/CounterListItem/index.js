import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { GestureHandler } from "expo";

import { Spring, animated } from "react-spring/native";

import styles from "./styles";
import { increment, decrement } from "../../reducers/transitions";
import Icon from "../Icon";

const { State, PanGestureHandler } = GestureHandler;
const AnimatedView = animated(View);
const AnimatedIcon = animated(Icon);

const interpolateIconSize = x => {
  return x
    .interpolate({
      map: Math.abs,
      range: [10, 80],
      output: [26, 40],
      extrapolate: "clamp",
    })
    .interpolate(x => parseInt(x, 10));
};

const THRESHOLD = 80;

class CounterListItem extends Component {
  state = {
    down: false,
    deltaX: 0,
  };
  onPanGestureEvent = ({ nativeEvent }) => {
    const deltaX = nativeEvent.translationX;
    const cappedDeltaX = Math.min(THRESHOLD, Math.abs(deltaX)) * (deltaX < 0 ? -1 : 1);
    this.setState({
      deltaX: cappedDeltaX,
    });
  };

  onHandlerStateChange = ({ nativeEvent }) => {
    const eventState = nativeEvent.state;
    this.setState(state => {
      if (eventState === State.END) {
        if (Math.abs(state.deltaX) >= THRESHOLD) {
          if (state.deltaX < 0) {
            this.props.increment();
          } else {
            this.props.decrement();
          }
        }
      }
      return {
        down: eventState === State.ACTIVE,
        deltaX: eventState === State.BEGAN ? 0 : state.deltaX,
      };
    });
  };

  render() {
    const { background, count, name } = this.props;
    const { deltaX, down } = this.state;
    return (
      <PanGestureHandler
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <View style={{ ...styles.container, backgroundColor: deltaX > 0 ? "#FF1C68" : "#14D790" }}>
          <Spring native to={{ x: down ? deltaX : 0 }} immediate={name => down && name === "x"}>
            {({ x }) => (
              <React.Fragment>
                <View style={styles.iconContainer}>
                  <AnimatedIcon name="remove" size={interpolateIconSize(x)} color="white" />
                  <AnimatedIcon name="add" size={interpolateIconSize(x)} color="white" />
                </View>
                <AnimatedView style={{ transform: [{ translateX: x }] }}>
                  <ImageBackground source={{ uri: background }} style={styles.background} />
                  <View style={styles.backgroundMask} />
                  <View style={styles.content}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.counterText}>{count}</Text>
                  </View>
                </AnimatedView>
              </React.Fragment>
            )}
          </Spring>
        </View>
      </PanGestureHandler>
    );
  }
}

CounterListItem.defaultProps = {
  count: 0,
  decrement: () => {},
  increment: () => {},
};

CounterListItem.propTypes = {
  background: PropTypes.string.isRequired,
  count: PropTypes.number,
  decrement: PropTypes.func,
  id: PropTypes.string.isRequired,
  increment: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default compose(
  connect(
    null,
    (dispatch, { id }) => ({
      increment: () => dispatch(increment(id)),
      decrement: () => dispatch(decrement(id)),
    })
  )
)(CounterListItem);
