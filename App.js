import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { BACKGROUND_COLOR, TEXT_COLOR } from "./theme";

import rootReducer from "./reducers";

import StatusBar from "./components/StatusBar";

import HomeScreen from "./screens/HomePage";
import CreateNew from "./screens/CreateNew";

const store = createStore(rootReducer);

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    CreateNew: {
      screen: CreateNew,
    },
  },
  {
    mode: "modal",
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR,
      },
      headerTintColor: TEXT_COLOR,
      headerTitleStyle: {
        fontWeight: "600",
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <AppContainer />
      </Provider>
    );
  }
}
