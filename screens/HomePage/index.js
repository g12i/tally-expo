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
    lastTap: {
      time: 0,
      id: null,
    },
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

  _navigateToStats = id => {
    this.props.navigation.navigate("Stats", { id });
  };

  _onPressItem = id => {
    if (this.state.inEditMode) {
      return this._navigateToEdit(id);
    }

    const now = Number(new Date());
    const { time: lastTapTime, id: lastTapId } = this.state.lastTap;
    this.setState({ lastTap: { time: now, id } });
    if (lastTapId === id && now - lastTapTime < 300) {
      this._navigateToStats(id);
    }
  };

  render() {
    return <CounterList inEditMode={this.state.inEditMode} onPressItem={this._onPressItem} />;
  }
}

export default HomeScreen;
