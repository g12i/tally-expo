import chunk from "lodash/chunk";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { ActivityIndicator, FlatList, ImageBackground, Text, View } from "react-native";
import { TEXT_COLOR } from "../../theme";
import styles from "./styles";

class Gallery extends PureComponent {
  static defaultProps = {
    columns: 2,
    data: [],
    loading: false,
    onEndReached: noop,
    selectedId: null,
  };

  static propTypes = {
    columns: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      })
    ).isRequired,
    loading: PropTypes.bool,
    onEndReached: PropTypes.func,
    selectedId: PropTypes.string,
  };

  galleryWidth = 0;
  momentumBegins = false;
  _onGalleryLayout = event => (this.galleryWidth = event.nativeEvent.layout.width - 32);
  _onMomentumBegins = () => (this.momentumBegins = false);
  _rowKeyExtractor = (_, i) => `row-${i}`;
  _columnKeyExtractor = (_, i) => `column=${i}`;
  _onEndReached = () => {
    if (!this.momentumBegins) {
      this.props.onEndReached();
      this.momentumBegins = true;
    }
  };

  renderLoader() {
    const { loading } = this.props;
    return (
      loading && (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color={TEXT_COLOR} />
        </View>
      )
    );
  }

  renderItem({ item: chunk }) {
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
        {chunk.map((image, i) => (
          <View key={this._columnKeyExtractor(image, i)}>
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={{
                borerRadius: 5,
                width: imageSize,
                height: imageSize,
              }}
              source={{
                uri: image.uri,
              }}
            />
            <Text style={{ color: TEXT_COLOR }}>{image.author}</Text>
          </View>
        ))}
      </View>
    );
  }

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
