import React, { PureComponent } from "react";
import { Text, View, FlatList, ActivityIndicator, ImageBackground, ScrollView } from "react-native";
import chunk from "lodash/chunk";
import debounce from "lodash/debounce";
import styles from "./styles";

import TextButton from "../../components/TextButton";
import Margin from "../../components/Margin";
import SearchBar from "../../components/SearchBar";
import { TEXT_COLOR } from "../../theme";

const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );

const fetchPicture = () =>
  fetch("https://source.unsplash.com/random").then(response => ({
    uri: response.url,
  }));

class ChooseBackground extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Choose background",
      headerLeft: <TextButton title="Back" icon="arrow-back" onPress={() => navigation.goBack()} />,
    };
  };
  state = {
    query: "",
    results: [],
    loading: false,
    galleryWidth: 0,
  };
  componentDidMount() {
    this.searchForImages();
  }
  searchForImages = query => {
    this.setState({ loading: true });
    promiseSerial(
      Array(10)
        .fill()
        .map(() => fetchPicture)
    ).then(results => {
      this.setState({
        results,
        loading: false,
      });
    });
  };
  throttledSearchForImages = debounce(this.searchForImages, 800);
  _setQuery = query => {
    this.setState({ query });
    this.throttledSearchForImages(query);
  };
  _onGalleryLayout = event => {
    const { width } = event.nativeEvent.layout;
    this.setState({ galleryWidth: width - 32 });
  };
  _galleryKeyExtractor = (item, index) => `gallery-${index}`;
  render() {
    const chunkSize = 2;
    const imageSize = (this.state.galleryWidth - (chunkSize - 1) * 16) / chunkSize;
    return (
      <View style={styles.screen} onLayout={this._onGalleryLayout}>
        <View style={styles.padding}>
          <Margin top={2} bottom={1}>
            <Text style={styles.header}>Unsplash photos</Text>
          </Margin>
          <SearchBar value={this.state.query} onChangeText={this._setQuery} />
        </View>
        <Margin top={2} style={{ flex: 1 }}>
          {this.state.loading && (
            <View style={styles.loaderWrapper}>
              <ActivityIndicator size="large" color={TEXT_COLOR} />
            </View>
          )}
          {!this.state.loading && (
            <FlatList
              keyExtractor={this._galleryKeyExtractor}
              data={chunk(this.state.results, chunkSize)}
              style={styles.padding}
              onEndReached={console.log.bind(console)}
              renderItem={({ item }, i) => (
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    marginBottom: 16,
                    alignContent: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {item.map((image, i) => (
                    <ImageBackground
                      key={`image-${i}`}
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
                  ))}
                </View>
              )}
            />
          )}
        </Margin>
      </View>
    );
  }
}

export default ChooseBackground;
