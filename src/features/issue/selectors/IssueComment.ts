import { IssueCommentStateType } from '../reducers/IssueComment';
import { StateType } from '../../../store/StateType';

export const selectIssueComment = () => (
  state: StateType,
): IssueCommentStateType => state.issueComment;
