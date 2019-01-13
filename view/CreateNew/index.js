import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View } from "react-native";

import {
  RESET_NEVER,
  RESET_DAILY,
  RESET_WEEKLY,
  RESET_MONTHLY,
  RESET_YEARLY,
  addCounter,
} from "../../reducers/counters";

import FieldGroup from "../../components/FieldGroup";
import Header from "../../components/Header";
import Select from "../../components/Select";
import TextButton from "../../components/TextButton";
import TextInput from "../../components/TextInput";

class CreateNew extends PureComponent {
  state = {
    name: "",
    reset: RESET_NEVER,
  };
  saveAndHide = () => {
    this.props.addCounter({
      name: this.state.name,
      background: "",
      reset: this.state.reset,
    });
    this.props.hide();
  };
  render() {
    const { hide } = this.props;
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <Header
          leftButton={<TextButton title="Cancel" onPress={hide} />}
          rightButton={
            <TextButton
              title="Save"
              onPress={this.saveAndHide}
              disabled={this.state.name.length === 0}
            />
          }
          title="Create new"
          marginBottom={1}
        />
        <FieldGroup marginBottom={2}>
          <TextInput placeholder="Name" onChangeText={name => this.setState({ name })} />
        </FieldGroup>
        <FieldGroup>
          <Select
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
          />
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
