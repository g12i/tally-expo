import chunk from "lodash/chunk";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { ActivityIndicator, FlatList, ImageBackground, Text, View } from "react-native";
import { TEXT_COLOR } from "../../theme";
import Touchable from "../Touchable";
import styles from "./styles";

class Gallery extends PureComponent {
  static defaultProps = {
    columns: 2,
    data: [],
    loading: false,
    onEndReached: noop,
    onItemPress: noop,
    selectedId: null,
  };

  static propTypes = {
    columns: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
      })
    ).isRequired,
    loading: PropTypes.bool,
    onEndReached: PropTypes.func,
    onItemPress: PropTypes.func,
    selectedId: PropTypes.string,
  };

  galleryWidth = 0;
  momentumBegins = false;
  _onGalleryLayout = event => (this.galleryWidth = event.nativeEvent.layout.width - 32);
  _onMomentumBegins = () => (this.momentumBegins = false);
  _rowKeyExtractor = chunk => chunk.map(item => item.id).join("-");
  _columnKeyExtractor = item => item.id;
  _onEndReached = () => {
    if (!this.momentumBegins) {
      this.props.onEndReached();
      this.momentumBegins = true;
    }
  };
  _onItemPress = item => () => {
    this.props.onItemPress(item.id);
  };

  renderLoader = () =>
    this.props.loading && (
      <View style={styles.loaderWrapper}>
        <ActivityIndicator size="large" color={TEXT_COLOR} />
      </View>
    );

  renderItem = ({ item: chunk }) => {
    const { columns } = this.props;
    const imageSize = (this.galleryWidth - (columns - 1) * 16) / columns;

    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginBottom: 16,
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        {chunk.map((item, i) => (
          <View key={this._columnKeyExtractor(item, i)}>
            <Touchable onPress={this._onItemPress(item)}>
              <ImageBackground
                imageStyle={{ borderRadius: 5 }}
                style={{
                  borderRadius: 5,
                  width: imageSize,
                  height: imageSize,
                }}
                source={{ uri: item.uri }}
              />
              <Text style={{ color: TEXT_COLOR }}>{item.author}</Text>
            </Touchable>
          </View>
        ))}
      </View>
    );
  };

  render() {
    const { columns, data } = this.props;
    const chunks = chunk(data, columns);

    return (
      <View onLayout={this._onGalleryLayout}>
        <FlatList
          keyExtractor={this._rowKeyExtractor}
          data={chunks}
          style={styles.padding}
          ListFooterComponent={this.renderLoader}
          onMomentumScrollBegin={this._onMomentumBegins}
          onEndReachedThreshold={0.5}
          onEndReached={this._onEndReached}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Gallery;
