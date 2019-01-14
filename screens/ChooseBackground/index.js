import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { GestureHandler } from "expo";
import { BRAND_PRIMARY, BACKGROUND_COLOR } from "../../theme";

import TextButton from "../../components/TextButton";
import FieldGroup from "../../components/FieldGroup";
import Icon from "../../components/Icon";

const { RectButton } = GestureHandler;

class ChooseBackground extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Choose background",
      headerLeft: <TextButton title="Back" icon="arrow-back" onPress={() => navigation.goBack()} />,
    };
  };

  render() {
    const { options = [] } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <FieldGroup>
          {options.map(({ value: itemValue, label }) => (
            <RectButton
              style={styles.option}
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

export default ChooseBackground;
