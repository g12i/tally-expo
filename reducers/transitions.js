import uuid from "uuid/v4";

export const INCREMENT = "transitions/INCREMENT";
export const DECREMENT = "transitions/DECREMENT";

export const increment = counterId => ({
  type: INCREMENT,
  payload: {
    date: new Date().getTime(),
    id: uuid(),
    transition: 1,
    counterId,
  },
});

export const decrement = counterId => ({
  type: DECREMENT,
  payload: {
    date: new Date().getTime(),
    id: uuid(),
    transition: -1,
    counterId,
  },
});

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
    case DECREMENT:
      return [...state, action.payload];
    default:
      return state;
  }
}
