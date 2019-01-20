import { combineReducers } from "redux";
import * as asyncInitialState from "redux-async-initial-state";
import counters from "./counters";
import transitions from "./transitions";

export default asyncInitialState.outerReducer(
  combineReducers({
    asyncInitialState: asyncInitialState.innerReducer,
    counters,
    transitions,
  })
);
