import React, { PureComponent } from "react";
import { BRAND_PRIMARY } from "../../theme";

import CounterList from "../../components/CounterList/index";
import TextButton from "../../components/TextButton/index";

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
    };
  };

  render() {
    return <CounterList />;
  }
}

export default HomeScreen;
