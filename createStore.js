import { AsyncStorage } from "react-native";
import { applyMiddleware, createStore as createReduxStore } from "redux";
import * as asyncInitialState from "redux-async-initial-state";
import persistMiddleware from "./middleware/persist";
import rootReducer from "./reducers";
import { ADD_COUNTER, REMOVE_COUNTER } from "./reducers/counters";
import { DECREMENT, INCREMENT } from "./reducers/transitions";

const loadStore = async () => {
  try {
    return await AsyncStorage.getItem("STORE").then(JSON.parse);
  } catch (err) {
    // @todo - handle
    console.error(err);
    return {};
  }
};

const createStore = () => {
  const store = createReduxStore(
    rootReducer,
    applyMiddleware(
      asyncInitialState.middleware(loadStore),
      persistMiddleware([ADD_COUNTER, REMOVE_COUNTER, INCREMENT, DECREMENT])
    )
  );
  store.dispatch({ type: "FETCH_ASYNC_STATE" });
  return store;
};

export default createStore;
