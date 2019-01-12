import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Spring, animated } from "react-spring/native";

import styles from "./styles";
import { increment, decrement } from "../../reducers/transitions";

const AnimatedView = animated(View);

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
              <AnimatedView
                style={{
                  transform: [{ translateX: x.interpolate(x => x) }],
                }}
              >
                <ImageBackground source={{ uri: background }} style={styles.background} />
                <View style={styles.backgroundMask} />
                <View style={styles.content}>
                  <Text style={styles.nameText}>{name}</Text>
                  <Text style={styles.counterText}>{count}</Text>
                </View>
              </AnimatedView>
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
