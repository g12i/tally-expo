import { combineReducers } from "redux";

import counters from "./counters";
import transitions from "./transitions";

export default combineReducers({ counters, transitions });
