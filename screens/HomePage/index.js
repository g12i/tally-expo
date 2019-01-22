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
          title={navigation.getParam("inEditMode", false) ? "Ready" : "Edit"}
          onPress={navigation.getParam("onPressEditButton", noop)}
        />
      ),
    };
  };
  static propTypes = {
    navigation: PropTypes.shape({
      addListener: PropTypes.func,
      getParam: PropTypes.func,
      navigate: PropTypes.func,
      setParams: PropTypes.func,
    }),
  };

  static defaultProps = {
    navigation: {
      addListener: noop,
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
    this.navigationDidBlurSubscription = this.props.navigation.addListener("didBlur", () => {
      this.setState({ inEditMode: false });
    });
  }

  componentWillUnmount() {
    this.navigationDidBlurSubscription.remove();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.inEditMode !== this.state.inEditMode) {
      this.props.navigation.setParams({ inEditMode: this.state.inEditMode });
    }
  }

  _toggleEditMode = () => this.setState(state => ({ inEditMode: !state.inEditMode }));

  _navigateToEdit = id => {
    this.props.navigation.navigate("Edit", { id });
  };

  render() {
    return <CounterList inEditMode={this.state.inEditMode} onPressItem={this._navigateToEdit} />;
  }
}

export default HomeScreen;
