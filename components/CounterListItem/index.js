import { GestureHandler, Haptic } from "expo";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ImageBackground, Platform, Text, Vibration, View } from "react-native";
import { connect } from "react-redux";
import { animated, Spring, Transition } from "react-spring/native";
import { compose } from "redux";
import { decrement, increment } from "../../reducers/transitions";
import Icon from "../Icon";
import { Touchable } from "../Touchable";
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
    onPress: PropTypes.func,
  };

  static defaultProps = {
    background: {
      id: "",
      uri: "",
    },
    count: 0,
    decrement: noop,
    increment: noop,
    inEditMode: false,
    onPress: noop,
  };

  _onPanGestureEvent = ({ nativeEvent }) => {
    const deltaX = nativeEvent.translationX;
    if (!this.state.notified && Math.abs(deltaX) >= THRESHOLD) {
      if (Platform.OS === "ios") {
        // @todo - add additional checks
        Haptic.selection();
      } else {
        Vibration.vibrate(50);
      }
      this.setState({ notified: true });
    }
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
        notified: eventState === State.BEGAN ? false : state.notified,
      };
    });
  };

  _onPressItem = () => {
    this.props.onPress(this.props.id);
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

  wrapWithBackgroundImage = children => {
    if (this.props.background && this.props.background.uri)
      return (
        <ImageBackground source={{ uri: this.props.background.uri }} style={styles.background}>
          <View style={styles.backgroundMask} />
          {children}
        </ImageBackground>
      );
    else return children;
  };

  renderContent = () => {
    const { count, name, inEditMode } = this.props;
    return (
      <View style={styles.contentContainer}>
        {this.wrapWithBackgroundImage(
          <View style={styles.content}>
            <Text style={styles.nameText}>{name}</Text>
            <View style={styles.counterContainer}>
              <Transition
                items={inEditMode}
                from={{ position: "absolute", opacity: 0, x: 50 }}
                enter={{ opacity: 1, x: 0 }}
                leave={{ opacity: 0, x: 50 }}
                delay={this.props.index * 80}
              >
                {isInEditMode => ({ x, ...props }) => (
                  <AnimatedView style={[props, { transform: [{ translateX: x }] }]}>
                    <Text style={styles.counterText}>
                      {isInEditMode ? (
                        <Icon name="arrow-forward" size={22} />
                      ) : (
                        <Text>{count}</Text>
                      )}
                    </Text>
                  </AnimatedView>
                )}
              </Transition>
            </View>
          </View>
        )}
      </View>
    );
  };

  render() {
    const { deltaX, down } = this.state;
    return (
      <PanGestureHandler
        enabled={!this.props.inEditMode}
        minDeltaX={10}
        onGestureEvent={this._onPanGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}
      >
        <Touchable onPress={this._onPressItem}>
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
        </Touchable>
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
