import { GestureHandler } from "expo";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ImageBackground, Text, View } from "react-native";
import { connect } from "react-redux";
import { animated, Spring } from "react-spring/native";
import { compose } from "redux";
import { decrement, increment } from "../../reducers/transitions";
import Icon from "../Icon";
import styles from "./styles";

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

export class CounterListItem extends Component {
  state = {
    down: false,
    deltaX: 0,
  };

  static propTypes = {
    background: PropTypes.shape({
      id: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
    }),
    count: PropTypes.number,
    decrement: PropTypes.func,
    id: PropTypes.string.isRequired,
    increment: PropTypes.func,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
    background: {
      id: "",
      uri: "",
    },
    count: 0,
    decrement: () => {},
    increment: () => {},
  };

  _onPanGestureEvent = ({ nativeEvent }) => {
    const deltaX = nativeEvent.translationX;
    const cappedDeltaX = Math.min(THRESHOLD, Math.abs(deltaX)) * (deltaX < 0 ? -1 : 1);
    this.setState({
      deltaX: cappedDeltaX,
    });
  };

  _onHandlerStateChange = ({ nativeEvent }) => {
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

  renderAction = ({ icon, backgroundColor, left = "auto", right = "auto" }) => x => {
    return (
      <View style={{ ...styles.iconContainer, left, right, backgroundColor }}>
        <AnimatedIcon name={icon} size={interpolateIconSize(x)} color="white" />
      </View>
    );
  };

  renderLeftAction = this.renderAction({
    icon: "remove",
    backgroundColor: "#FF1C68",
    left: 0,
  });

  renderRightAction = this.renderAction({
    icon: "add",
    backgroundColor: "#14D790",
    right: 0,
  });

  render() {
    const { background, count, name } = this.props;
    const { deltaX, down } = this.state;
    return (
      <PanGestureHandler
        minDeltaX={10}
        onGestureEvent={this._onPanGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}
      >
        <View style={styles.container}>
          <Spring
            native
            to={{ x: down ? deltaX : 0 }}
            immediate={propName => down && propName === "x"}
          >
            {({ x }) => (
              <React.Fragment>
                {this.renderLeftAction(x)}
                {this.renderRightAction(x)}
                <AnimatedView style={{ transform: [{ translateX: x }] }}>
                  {background.uri ? (
                    <ImageBackground source={{ uri: background.uri }} style={styles.background} />
                  ) : (
                    <View style={styles.backgroundMock} />
                  )}
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

export default compose(
  connect(
    null,
    (dispatch, { id }) => ({
      increment: () => dispatch(increment(id)),
      decrement: () => dispatch(decrement(id)),
    })
  )
)(CounterListItem);
