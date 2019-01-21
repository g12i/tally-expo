import { GestureHandler, Haptic } from "expo";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ImageBackground, Text, View } from "react-native";
import { connect } from "react-redux";
import { animated, Spring, Transition } from "react-spring/native";
import { compose } from "redux";
import { decrement, increment } from "../../reducers/transitions";
import { TEXT_COLOR } from "../../theme";
import Icon from "../Icon";
import styles from "./styles";

const { State, PanGestureHandler } = GestureHandler;
const AnimatedView = animated(View);
const AnimatedIcon = animated(Icon);

const interpolateIconSize = x => {
  return x
    .interpolate({
      map: Math.abs,
      range: [20, 80],
      output: [26, 48],
      extrapolate: "clamp",
    })
    .interpolate(x => parseInt(x, 10));
};

const THRESHOLD = 80;

export class CounterListItem extends Component {
  state = {
    down: false,
    deltaX: 0,
    notified: false,
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
    index: PropTypes.number.isRequired,
    inEditMode: PropTypes.bool,
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
    inEditMode: false,
  };

  _onPanGestureEvent = ({ nativeEvent }) => {
    if (this.props.inEditMode) {
      return;
    }
    const deltaX = nativeEvent.translationX;
    if (!this.state.notified && Math.abs(deltaX) >= THRESHOLD) {
      Haptic.selection();
      this.setState({ notified: true });
    }
    const cappedDeltaX = Math.min(THRESHOLD, Math.abs(deltaX)) * (deltaX < 0 ? -1 : 1);
    this.setState({
      deltaX: cappedDeltaX,
    });
  };

  _onHandlerStateChange = ({ nativeEvent }) => {
    if (this.props.inEditMode) {
      return;
    }
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
        notified: eventState === State.BEGAN ? false : state.notified,
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

  renderContent = () => {
    const { background, count, name } = this.props;
    return (
      <View style={styles.contentContainer}>
        <View style={styles.backgroundMock} />
        <ImageBackground source={{ uri: background.uri }} style={styles.background} />
        <View style={styles.backgroundMask} />
        <View style={styles.content}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.counterText}>{count}</Text>
        </View>
      </View>
    );
  };

  render() {
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
                  {this.renderContent()}
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
