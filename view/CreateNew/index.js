import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import Header from "../../components/Header";
import TextButton from "../../components/TextButton";

class CreateNew extends PureComponent {
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
        <Header leftButton={<TextButton title="Cancel" onPress={hide} />} title="Create new" />
        <Text>Hello there!</Text>
      </View>
    );
  }
}

CreateNew.defaultProps = {};

CreateNew.propTypes = {};

export default connect()(CreateNew);
