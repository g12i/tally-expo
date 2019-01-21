import noop from "lodash/noop";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import CounterList from "../../components/CounterList/index";
import TextButton from "../../components/TextButton/index";
import { BRAND_PRIMARY } from "../../theme";

class HomeScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Counters",
      headerRight: (
        <TextButton
          onPress={() => navigation.navigate("CreateNew")}
          icon="add"
          color={BRAND_PRIMARY}
        />
      ),
      headerLeft: (
        <TextButton
          title={navigation.getParam("inEditMode", false) ? "Edit" : "Ready"}
          onPress={navigation.getParam("onPressEditButton", noop)}
        />
      ),
    };
  };
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
      setParams: PropTypes.func,
    }),
  };

  static defaultProps = {
    navigation: {
      getParam: noop,
      navigate: noop,
      setParams: noop,
    },
  };

  state = {
    inEditMode: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({ onPressEditButton: this._toggleEditMode });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.inEditMode !== this.state.inEditMode) {
      this.props.navigation.setParams({ inEditMode: this.state.inEditMode });
    }
  }

  _toggleEditMode = () => this.setState(state => ({ inEditMode: !state.inEditMode }));
  _navigateToEdit = () => {
    this.props.navigation.navigate("Edit", {
      id: "5600d0b5-9d40-463a-90bb-1fd40aaa6a2a",
    });
  };

  render() {
    return <CounterList inEditMode={this.state.inEditMode} />;
  }
}

export default HomeScreen;
