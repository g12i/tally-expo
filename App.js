import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import StatusBar from "./components/StatusBar";
import createStore from "./createStore";
import ChooseBackground from "./screens/ChooseBackground";
import ChooseResetFrequency from "./screens/ChooseResetFrequency";
import CreateNew from "./screens/CreateNew";
import HomeScreen from "./screens/HomePage";
import { BACKGROUND_COLOR, BORDER_COLOR, TEXT_COLOR } from "./theme";
import Edit from "./screens/Edit";
import Stats from "./screens/Stats";

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

const EditStack = createStackNavigator(
  {
    EditHome: {
      screen: Edit,
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
    Stats: {
      screen: Stats,
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
    Edit: {
      screen: EditStack,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  store = createStore();
  render() {
    return (
      <Provider store={this.store}>
        <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <AppContainer />
      </Provider>
    );
  }
}
