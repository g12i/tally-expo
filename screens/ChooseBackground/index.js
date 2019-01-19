import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import Gallery from "../../components/Gallery";
import Margin from "../../components/Margin";
import SearchBar from "../../components/SearchBar";
import TextButton from "../../components/TextButton";
import { getRandomPhotos, searchPhotos } from "../../utils/unsplash";
import styles from "./styles";

class ChooseBackground extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Choose background",
      headerLeft: <TextButton title="Back" icon="arrow-back" onPress={() => navigation.goBack()} />,
    };
  };

  static propTypes = {
    initialQuery: PropTypes.string,
  };

  static defaultProps = {
    initialQuery: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      isLastPage: false,
      loading: false,
      noResults: false,
      page: 1,
      query: props.initialQuery,
      results: [],
    };
  }

  componentDidMount() {
    if (this.state.query) {
      this.fetchPictures();
    } else {
      this.fetchRandomPictures();
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.query && this.state.query === "") {
      this.setState({
        noResults: false,
        results: [],
      }); // clear the results
    }
  }

  _fetchPictures = async (query, page, apiCall = searchPhotos) => {
    try {
      this.setState({ loading: true });
      const { photos, isLastPage } = await apiCall(query, page);
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
        isLastPage,
        noResults: photos.length === 0,
        page: 1,
        results: photos,
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

  fetchRandomPictures = async () => {
    this._fetchPictures(null, null, getRandomPhotos).then(({ photos, isLastPage }) => {
      this.setState({
        results: photos,
        page: 1,
        isLastPage,
      });
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
            noResults={this.state.noResults}
            data={this.state.results}
            loading={this.state.loading}
            onEndReached={this._onEndReached}
            onItemPress={id => console.log(id)}
          />
        </Margin>
      </View>
    );
  }
}

export default ChooseBackground;
