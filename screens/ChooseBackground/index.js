import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { GestureHandler } from "expo";
import { BRAND_PRIMARY, BACKGROUND_COLOR } from "../../theme";

import TextButton from "../../components/TextButton";

const { RectButton } = GestureHandler;

class ChooseBackground extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Choose background",
      headerLeft: <TextButton title="Back" icon="arrow-back" onPress={() => navigation.goBack()} />,
    };
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <Text>Hello world</Text>
      </View>
    );
  }
}

export default ChooseBackground;
