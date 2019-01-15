import React, { PureComponent } from "react";
import { Text, View, FlatList, ActivityIndicator, ImageBackground, ScrollView } from "react-native";
import chunk from "lodash/chunk";
import debounce from "lodash/debounce";
import styles from "./styles";

import TextButton from "../../components/TextButton";
import Margin from "../../components/Margin";
import SearchBar from "../../components/SearchBar";
import { TEXT_COLOR } from "../../theme";
import { searchPhotos } from "../../utils/unsplash";

class ChooseBackground extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Choose background",
      headerLeft: <TextButton title="Back" icon="arrow-back" onPress={() => navigation.goBack()} />,
    };
  };

  state = {
    loading: false,
    page: 1,
    query: "",
    results: [],
  };
  galleryWidth = 0;
  onEndReachedCalledDuringMomentum = false;

  componentDidMount() {
    this.fetchPictures();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.query && this.state.query === "") {
      this.setState({ results: [] }); // clear the results
    }
  }

  _fetchPictures = async (query, page) => {
    try {
      console.log(`Searching for ${query}`);
      this.setState({ loading: true });
      const photos = await searchPhotos(query, page);

      return photos.map(photo => ({
        author: photo.user.name,
        id: photo.id,
        uri: photo.urls.small,
      }));
    } catch (err) {
      // @todo - show error
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchPictures = () => {
    this._fetchPictures(this.state.query, this.state.page).then(newResults => {
      this.setState({
        results: newResults,
      });
    });
  };

  fetchNextPage = () => {
    this._fetchPictures(this.state.query, this.state.page + 1).then(newResults => {
      this.setState(state => ({
        results: state.results.concat(newResults),
        page: state.page + 1,
      }));
    });
  };

  fetchPicturesThrottled = debounce(this.fetchPictures, 800);

  _setQuery = query => {
    this.setState({ query });
    if (query.length) this.fetchPicturesThrottled();
  };

  _onGalleryLayout = event => {
    const { width } = event.nativeEvent.layout;
    this.galleryWidth = width - 32;
  };

  _galleryKeyExtractor = (_, index) => `gallery-${index}`;

  _resetOnEndReachedCalledDuringMomentum = () => (this.onEndReachedCalledDuringMomentum = false);

  _onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.fetchNextPage(this.state.query, this.state.page);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  render() {
    const chunkSize = 2;
    const imageSize = (this.galleryWidth - (chunkSize - 1) * 16) / chunkSize;
    return (
      <View style={styles.screen} onLayout={this._onGalleryLayout}>
        <View style={styles.padding}>
          <Margin top={2} bottom={1}>
            <Text style={styles.header}>Unsplash photos</Text>
          </Margin>
          <SearchBar value={this.state.query} onChangeText={this._setQuery} />
        </View>
        <Margin top={2} style={{ flex: 1 }}>
          <FlatList
            keyExtractor={this._galleryKeyExtractor}
            data={chunk(this.state.results, chunkSize)}
            style={styles.padding}
            ListFooterComponent={() => {
              return (
                this.state.loading && (
                  <View style={styles.loaderWrapper}>
                    <ActivityIndicator size="large" color={TEXT_COLOR} />
                  </View>
                )
              );
            }}
            onMomentumScrollBegin={this._resetOnEndReachedCalledDuringMomentum}
            onEndReachedThreshold={0.5}
            onEndReached={this._onEndReached}
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
        </Margin>
      </View>
    );
  }
}

export default ChooseBackground;
