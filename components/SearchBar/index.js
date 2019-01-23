import React, { PureComponent } from "react";
import { View, TextInput as NativeTextInput } from "react-native";
import { Transition, animated } from "react-spring/native";

import styles from "./styles";
import { TouchableText } from "../Touchable";
import Icon from "../Icon";

const AnimatedView = animated(View);

class SearchBar extends PureComponent {
  static defaultProps = {
    onChangeText: () => {},
    value: null,
  };
  constructor(props) {
    super(props);
  }
  _onChangeText = value => this.props.onChangeText(value);
  _clear = () => this.props.onChangeText("");
  render() {
    const { value } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Icon name="search" style={styles.icon} size={20} />
          <NativeTextInput
            style={styles.input}
            onChangeText={this._onChangeText}
            value={value}
            placeholder="Search"
            placeholderTextColor={styles.placeholder.color}
          />
          <Transition
            items={value.length > 0}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {show =>
              show &&
              (props => (
                <AnimatedView style={props}>
                  <TouchableText style={styles.clearIconTouchable} onPress={this._clear}>
                    <Icon name="close-circle" style={styles.clearIcon} size={20} />
                  </TouchableText>
                </AnimatedView>
              ))
            }
          </Transition>
        </View>
      </View>
    );
  }
}

export default SearchBar;
