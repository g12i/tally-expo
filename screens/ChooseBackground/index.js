import debounce from "lodash/debounce";
import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import Gallery from "../../components/Gallery";
import Margin from "../../components/Margin";
import SearchBar from "../../components/SearchBar";
import TextButton from "../../components/TextButton";
import { searchPhotos } from "../../utils/unsplash";
import styles from "./styles";

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
    isLastPage: false,
    query: "",
    results: [],
  };

  componentDidMount() {
    // this.fetchPictures();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.query && this.state.query === "") {
      this.setState({ results: [] }); // clear the results
    }
  }

  _fetchPictures = async (query, page) => {
    try {
      this.setState({ loading: true });
      const { photos, isLastPage } = await searchPhotos(query, page);
      return {
        photos: photos.map(photo => ({
          author: photo.user.name,
          id: photo.id,
          uri: photo.urls.small,
        })),
        isLastPage,
      };
    } catch (err) {
      // @todo - show error
      console.log(err);
      throw err;
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchPictures = () => {
    this._fetchPictures(this.state.query, 1).then(({ photos, isLastPage }) => {
      this.setState({
        results: photos,
        page: 1,
        isLastPage,
      });
    });
  };

  fetchNextPage = () => {
    if (this.state.isLastPage) return;

    this._fetchPictures(this.state.query, this.state.page + 1).then(({ photos, isLastPage }) => {
      this.setState(state => ({
        results: state.results.concat(photos),
        page: !isLastPage ? state.page + 1 : state.page,
        isLastPage,
      }));
    });
  };

  fetchPicturesThrottled = debounce(this.fetchPictures, 800);

  _setQuery = query => {
    this.setState({ query });
    if (query.length) this.fetchPicturesThrottled();
  };

  _onEndReached = () => {
    this.fetchNextPage(this.state.query, this.state.page);
  };

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.padding}>
          <Margin top={2} bottom={1}>
            <Text style={styles.header}>Unsplash photos</Text>
          </Margin>
          <SearchBar value={this.state.query} onChangeText={this._setQuery} />
        </View>
        <Margin top={2} style={{ flex: 1 }}>
          <Gallery
            data={this.state.results}
            loading={this.state.loading}
            onEndReached={this._onEndReached}
          />
        </Margin>
      </View>
    );
  }
}

export default ChooseBackground;
