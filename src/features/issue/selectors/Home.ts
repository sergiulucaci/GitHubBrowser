import { IssueStateType } from '../Reducers/Issue';
import { StateType } from '../../../store/StateType';

export const selectIssue = () => (state: StateType): IssueStateType => state.issue;
