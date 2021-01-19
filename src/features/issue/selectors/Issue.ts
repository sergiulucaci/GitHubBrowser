import { IssueStateFiltersType, IssueStateType } from '../Reducers/Issue';
import { StateType } from '../../../store/StateType';
import { IssueWithRepository } from '../models/Issue';

export const selectIssue = () => (state: StateType): IssueStateType => state.issue;

export const selectIssueFilters = (state: StateType): IssueStateFiltersType => state.issue.filters;

export const selectIssueBookmarks = () => (state: StateType): Array<IssueWithRepository> => state.issue.bookmarks;
