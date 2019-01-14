import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { BACKGROUND_COLOR, TEXT_COLOR, BORDER_COLOR } from "./theme";

import rootReducer from "./reducers";

import StatusBar from "./components/StatusBar";

import HomeScreen from "./screens/HomePage";
import CreateNew from "./screens/CreateNew";
import ChooseBackground from "./screens/ChooseBackground";
import ChooseResetFrequency from "./screens/ChooseResetFrequency";

const store = createStore(rootReducer);

const CreateNewStack = createStackNavigator(
  {
    CreateNewHome: {
      screen: CreateNew,
    },
    ChooseResetFrequency: {
      screen: ChooseResetFrequency,
    },
    ChooseBackground: {
      screen: ChooseBackground,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomColor: BORDER_COLOR,
      },
      headerTintColor: TEXT_COLOR,
      headerTitleStyle: {
        fontWeight: "600",
      },
    },
  }
);

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomColor: BORDER_COLOR,
      },
      headerTintColor: TEXT_COLOR,
      headerTitleStyle: {
        fontWeight: "600",
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    CreateNew: {
      screen: CreateNewStack,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
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
