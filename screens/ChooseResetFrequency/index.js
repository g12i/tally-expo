import React, { PureComponent } from "react";
import { View } from "react-native";
import { BACKGROUND_COLOR } from "../../theme";

import {
  RESET_NEVER,
  RESET_DAILY,
  RESET_WEEKLY,
  RESET_MONTHLY,
  RESET_YEARLY,
} from "../../reducers/counters";

import TextButton from "../../components/TextButton";
import OptionList from "../../components/OptionList";

class ChooseResetFrequency extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Reset",
      headerLeft: <TextButton title="Back" icon="arrow-back" onPress={() => navigation.goBack()} />,
    };
  };

  options = [
    { label: "Never", value: RESET_NEVER },
    { label: "Daily", value: RESET_DAILY },
    { label: "Weekly", value: RESET_WEEKLY },
    { label: "Monthly", value: RESET_MONTHLY },
    { label: "Yearly", value: RESET_YEARLY },
  ];

  _onChange = value => {
    const { navigation } = this.props;

    const onChange = navigation.getParam("onChange", () => {});
    onChange(value);
    navigation.goBack();
  };

  render() {
    const value = this.props.navigation.getParam("value", null);
    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <OptionList options={this.options} value={value} onChange={this._onChange} marginTop={2} />
      </View>
    );
  }
}

export default ChooseResetFrequency;
