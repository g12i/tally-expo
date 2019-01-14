import React, { PureComponent } from "react";
import { FlatList, View, Text } from "react-native";
import styles from "./styles";
import { BRAND_PRIMARY } from "../../theme";
import Touchable from "../Touchable";
import Icon from "../Icon";

class OptionList extends PureComponent {
  static defaultProps = {
    options: [],
    value: null,
    onChange: () => {},
  };

  _keyExtractor = item => item.value;

  _onPressItem = item => () => {
    this.props.onChange(item.value);
  };

  _renderItem = ({ item }) => {
    return (
      <Touchable onPress={this._onPressItem(item)} style={styles.option}>
        <Text style={styles.optionText}>{item.label}</Text>
        {item.value === this.props.value && (
          <Icon name="checkmark" color={BRAND_PRIMARY} size={32} />
        )}
      </Touchable>
    );
  };

  _renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View
        style={{
          ...styles.container,
          marginTop: 16 * this.props.marginTop,
          marginBottom: 16 * this.props.marginBottom,
        }}
      >
        <FlatList
          data={this.props.options}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default OptionList;
