import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
import rootReducer from "./reducers";

import CounterList from "./components/CounterList";
import StatusBar from "./components/StatusBar";

const store = createStore(rootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor="#222831" barStyle="light-content" />
        <View style={styles.container}>
          <CounterList />
        </View>
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
