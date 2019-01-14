import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, View } from "react-native";

import {
  RESET_NEVER,
  RESET_DAILY,
  RESET_WEEKLY,
  RESET_MONTHLY,
  RESET_YEARLY,
  addCounter,
} from "../../reducers/counters";

import FieldGroup from "../../components/FieldGroup";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";
import { TEXT_COLOR } from "../../theme";

class CreateNew extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Counters",
      headerRight: (
        <Button onPress={() => navigation.navigate("CreateNew")} title="Save" color={TEXT_COLOR} />
      ),
      headerLeft: <Button onPress={() => navigation.goBack()} title="Cancel" color={TEXT_COLOR} />,
    };
  };
  state = {
    name: "",
    reset: RESET_NEVER,
    backgroundSync: false,
  };
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
    this.props.hide();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <FieldGroup marginBottom={2}>
          <TextInput placeholder="Name" onChangeText={name => this.setState({ name })} />
        </FieldGroup>
        <FieldGroup>
          {/* <Select
            label="Reset"
            value={this.state.reset}
            onChange={reset => this.setState({ reset })}
            options={[
              { label: "Never", value: RESET_NEVER },
              { label: "Daily", value: RESET_DAILY },
              { label: "Weekly", value: RESET_WEEKLY },
              { label: "Monthly", value: RESET_MONTHLY },
              { label: "Yearly", value: RESET_YEARLY },
            ]}
          /> */}
        </FieldGroup>
      </View>
    );
  }
}

CreateNew.defaultProps = {
  addCounter: () => {},
};

CreateNew.propTypes = {};

export default connect(
  null,
  dispatch => bindActionCreators({ addCounter }, dispatch)
)(CreateNew);
