import uuid from "uuid/v4";

export const RESET_DAILY = "counters/reset/DAILY";
export const RESET_WEEKLY = "counters/reset/WEEKLY";
export const RESET_MONTHLY = "counters/reset/MONTHLY";
export const RESET_YEARLY = "counters/reset/YEARLY";
export const RESET_NEVER = "counters/reset/NEVER";

export const ADD_COUNTER = "counters/ADD_COUNTER";
export const REMOVE_COUNTER = "counters/REMOVE_COUNTER";
export const UPDATE_COUNTER = "counters/UPDATE_COUNTER";

export const addCounter = ({ name, background = { uri: "", id: "" }, reset = RESET_DAILY }) => ({
  type: ADD_COUNTER,
  payload: { id: uuid(), name, background, reset },
});

export const removeCounter = id => ({
  type: REMOVE_COUNTER,
  payload: { id },
});

export const updateCounter = (id, { name, background, reset }) => ({
  type: UPDATE_COUNTER,
  payload: { id, name, background, reset },
});

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COUNTER:
      return [...state, action.payload];
    case REMOVE_COUNTER:
      return state.filter(({ id }) => id !== action.payload.id);
    case UPDATE_COUNTER:
      return state.map(counter =>
        counter.id === action.payload.id ? { ...counter, ...action.payload } : counter
      );
    default:
      return state;
  }
}
