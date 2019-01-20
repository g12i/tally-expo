import noop from "lodash/noop";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { ImageBackground, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FieldGroup from "../../components/FieldGroup";
import Select from "../../components/Select";
import TextButton from "../../components/TextButton";
import TextInput from "../../components/TextInput";
import {
  RESET_DAILY,
  RESET_MONTHLY,
  RESET_NEVER,
  RESET_WEEKLY,
  RESET_YEARLY,
  updateCounter,
} from "../../reducers/counters";
import { BRAND_PRIMARY } from "../../theme";
import styles from "./styles";

const ResetLabels = {
  [RESET_NEVER]: "Never",
  [RESET_DAILY]: "Daily",
  [RESET_WEEKLY]: "Weekly",
  [RESET_MONTHLY]: "Monthly",
  [RESET_YEARLY]: "Yearly",
};

class Edit extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Edit",
      headerRight: (
        <TextButton
          onPress={navigation.getParam("onPressUpdateButton", noop)}
          disabled={navigation.getParam("saveButtonDisabled", false)}
          title="Update"
          color={BRAND_PRIMARY}
        />
      ),
      headerLeft: (
        <TextButton
          onPress={() => navigation.navigate("Main")}
          title="Cancel"
          color={BRAND_PRIMARY}
        />
      ),
    };
  };

  static propTypes = {
    counter: PropTypes.shape({
      background: PropTypes.shape({
        id: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
      }),
      id: PropTypes.string.isRequired,
      reset: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
      setParams: PropTypes.func,
    }),
    updateCounter: PropTypes.func,
  };

  static defaultProps = {
    counter: {},
    navigation: {
      getParam: noop,
      navigate: noop,
      setParams: noop,
    },
    updateCounter: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.counter.name,
      reset: props.counter.reset,
      background: props.counter.background,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ onPressUpdateButton: this.updateAndHide });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.name !== this.state.name) {
      this.props.navigation.setParams({
        saveButtonDisabled: this.state.name.length === 0,
      });
    }
  }

  _navigateToResetFrequency = () => {
    this.props.navigation.navigate("ChooseResetFrequency", {
      onChange: this._setReset,
      value: this.state.reset,
    });
  };

  _navigateToBackgroundChoice = () => {
    this.props.navigation.navigate("ChooseBackground", {
      initialQuery: this.state.name,
      onChange: this._setBackground,
      value: this.state.background.id,
    });
  };

  _setName = name => this.setState({ name });
  _setReset = reset => this.setState({ reset });
  _setBackground = background => this.setState({ background });

  updateAndHide = async () => {
    if (!this.state.name) return;
    this.props.updateCounter(this.props.counter.id, {
      name: this.state.name,
      background: this.state.background,
      reset: this.state.reset,
    });
    this.props.navigation.navigate("Main");
  };

  renderBackgroundPreview = () => {
    if (!this.state.background.id) return null;

    return (
      <ImageBackground
        imageStyle={{ borderRadius: 2 }}
        source={{ uri: this.state.background.uri }}
        style={styles.backgroundPreview}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FieldGroup marginBottom={2} marginTop={1}>
          <TextInput value={this.state.name} placeholder="Name" onChangeText={this._setName} />
        </FieldGroup>
        <FieldGroup>
          <Select
            label="Reset"
            value={ResetLabels[this.state.reset]}
            onPress={this._navigateToResetFrequency}
          />
          <Select
            label="Background"
            value={this.renderBackgroundPreview()}
            onPress={this._navigateToBackgroundChoice}
          />
        </FieldGroup>
      </View>
    );
  }
}

export default connect(
  ({ counters }, { navigation }) => {
    const id = navigation.getParam("id", null);
    return { counter: counters.find(counter => counter.id === id) };
  },
  dispatch => bindActionCreators({ updateCounter }, dispatch)
)(Edit);
