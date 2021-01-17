import { HomeStateType } from '../features/Home/reducers/Home';
import { IssueStateType } from '../features/issue/reducers/Issue';

export type StateType = {
  home: HomeStateType,
  issue: IssueStateType,
};
