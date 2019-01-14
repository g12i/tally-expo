import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { GestureHandler } from "expo";
import { BRAND_PRIMARY, BACKGROUND_COLOR } from "../../theme";
import styles from "./styles";

import TextButton from "../../components/TextButton";
import FieldGroup from "../../components/FieldGroup";
import Icon from "../../components/Icon";

import {
  RESET_NEVER,
  RESET_DAILY,
  RESET_WEEKLY,
  RESET_MONTHLY,
  RESET_YEARLY,
} from "../../reducers/counters";

const { RectButton } = GestureHandler;

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

  onChange = value => () => {};

  render() {
    const value = null;
    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <FieldGroup>
          {this.options.map(({ value: itemValue, label }) => (
            <RectButton
              style={styles.potion}
              onPress={this.onChange(itemValue)}
              key={`option-${itemValue}`}
            >
              <Text style={styles.optionText}>{label}</Text>
              {value === itemValue && <Icon name="checkmark" color={BRAND_PRIMARY} size={32} />}
            </RectButton>
          ))}
        </FieldGroup>
      </View>
    );
  }
}

export default ChooseResetFrequency;
