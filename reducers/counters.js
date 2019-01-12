import uuid from 'uuid/v4';

export const RESET_DAILY = 'counters/reset/DAILY';
export const RESET_WEEKLY = 'counters/reset/WEEKLY';
export const RESET_MONTHLY = 'counters/reset/MONTHLY';
export const RESET_YEARLY = 'counters/reset/YEARLY';
export const RESET_NEVER = 'counters/reset/NEVER';

export const ADD_COUNTER = 'counters/ADD_COUNTER';
export const REMOVE_COUNTER = 'counters/REMOVE_COUNTER';

export const addCounter = ({ name, background = '', reset = RESET_DAILY }) => ({
  type: ADD_COUNTER,
  payload: { id: uuid(), name, background, reset },
});

export const removeCounter = id => ({
  type: REMOVE_COUNTER,
  payload: { id },
});

// const initialState = [];
const initialState = [
  {
    id: '1',
    name: 'Exercise',
    background:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  },
  { id: '2', name: 'world' },
];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COUNTER:
      return [...state, action.payload];
    case REMOVE_COUNTER:
      return state.filter(({ id }) => id !== action.payload.id);
    default:
      return state;
  }
}
