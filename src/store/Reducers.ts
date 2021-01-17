import { combineReducers } from 'redux';

import home from '../features/home/reducers/Home';
import issue from '../features/issue/reducers/Issue';

export default combineReducers({
  home,
  issue,
});
