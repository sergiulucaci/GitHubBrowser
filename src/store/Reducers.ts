import { combineReducers } from 'redux';

import home from '../features/home/reducers/Home';
import issue from '../features/issue/reducers/Issue';
import issueComment from '../features/issue/reducers/IssueComment';

export default combineReducers({
  home,
  issue,
  issueComment,
});
