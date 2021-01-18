import { HomeStateType } from '../features/Home/reducers/Home';
import { IssueStateType } from '../features/issue/reducers/Issue';
import { IssueCommentStateType } from '../features/issue/reducers/IssueComment';

export type StateType = {
  home: HomeStateType,
  issue: IssueStateType,
  issueComment: IssueCommentStateType,
};
