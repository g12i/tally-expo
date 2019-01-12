import { combineReducers } from 'redux';

import counters from './counters';
import transitions from './transitions';
import ui from './ui';

export default combineReducers({ counters, transitions, ui });
