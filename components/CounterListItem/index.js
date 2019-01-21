import { GestureHandler, Haptic } from "expo";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ImageBackground, Text, View } from "react-native";
import { connect } from "react-redux";
import { animated, Spring } from "react-spring/native";
import { compose } from "redux";
import { decrement, increment } from "../../reducers/transitions";
import Icon from "../Icon";
import Touchable from "../Touchable/index";
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
    const { background, count, name, inEditMode } = this.props;
    return (
      <View style={styles.contentContainer}>
        <View style={styles.backgroundMock} />
        <ImageBackground source={{ uri: background.uri }} style={styles.background} />
        <View style={styles.backgroundMask} />
        <View style={styles.content}>
          <Spring
            native
            from={{ x: inEditMode ? 0 : 20 }}
            to={{ x: inEditMode ? 20 : 0 }}
            delay={this.props.index * 80}
            immediate={false}
          >
            {({ x }) => (
              <AnimatedView style={{ transform: [{ translateX: x }] }}>
                <Text style={styles.nameText}>{name}</Text>
              </AnimatedView>
            )}
          </Spring>
          <Text style={styles.counterText}>{count}</Text>
        </View>
      </View>
    );
  };

  wrapWithInteractionHandler = children => {
    return this.props.inEditMode ? (
      <Touchable>{children}</Touchable>
    ) : (
      <PanGestureHandler
        minDeltaX={10}
        onGestureEvent={this._onPanGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}
      >
        {children}
      </PanGestureHandler>
    );
  };

  render() {
    const { deltaX, down } = this.state;
    return this.wrapWithInteractionHandler(
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
