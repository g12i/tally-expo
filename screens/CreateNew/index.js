import noop from "lodash/noop";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Button, ImageBackground, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FieldGroup from "../../components/FieldGroup";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";
import {
  addCounter,
  RESET_DAILY,
  RESET_MONTHLY,
  RESET_NEVER,
  RESET_WEEKLY,
  RESET_YEARLY,
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

class CreateNew extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Add new",
      headerRight: <Button onPress={() => {}} title="Save" color={BRAND_PRIMARY} />,
      headerLeft: (
        <Button onPress={() => navigation.navigate("Main")} title="Cancel" color={BRAND_PRIMARY} />
      ),
    };
  };

  static propTypes = {
    addCounter: PropTypes.func,
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      goBack: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  static defaultProps = {
    addCounter: noop,
    navigation: {
      getParam: noop,
      goBack: noop,
      navigate: noop,
    },
  };

  state = {
    name: "",
    reset: RESET_NEVER,
    background: {
      id: "",
      uri: "",
    },
  };

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

  saveAndHide = async () => {
    this.setState({ backgroundSync: true });
    const backgroundUrl = await fetch("https://source.unsplash.com/random").then(
      response => response.url
    );
    this.setState({ backgroundSync: false });
    this.props.addCounter({
      name: this.state.name,
      background: backgroundUrl,
      reset: this.state.reset,
    });
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
          <TextInput placeholder="Name" onChangeText={this._setName} />
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
  null,
  dispatch => bindActionCreators({ addCounter }, dispatch)
)(CreateNew);
