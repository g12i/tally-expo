import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
import rootReducer from "./reducers";

import CreateNew from "./view/CreateNew";

import CounterList from "./components/CounterList";
import Drawer, { Position } from "./components/Drawer";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import TextButton from "./components/TextButton";

const store = createStore(rootReducer);

export default class App extends Component {
  state = {
    displayCreateNewForm: false,
  };
  showCreateForm = () => {
    this.setState({ displayCreateNewForm: true });
  };
  hideCreateForm = () => {
    this.setState({ displayCreateNewForm: false });
  };
  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor="#222831" barStyle="light-content" />
        <View style={styles.container}>
          <Header
            leftButton={<TextButton title="Edit" />}
            title="Counters"
            rightButton={<TextButton icon="add" onPress={this.showCreateForm} />}
          />
          <CounterList />
        </View>
        <Drawer visible={this.state.displayCreateNewForm} position={Position.Bottom}>
          <CreateNew hide={this.hideCreateForm} />
        </Drawer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
});
