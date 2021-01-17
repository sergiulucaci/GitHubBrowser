import { FSA } from '../../../store/FSA';
import type { ApiIssues } from '../models/Issue';

export const IssueActionType = Object.freeze({
  GET_ISSUES: '@Issue/GET_ISSUES',
  GET_ISSUES_SUCCESS: '@Issue/GET_ISSUES_SUCCESS',
  GET_ISSUES_FAILURE: '@Issue/GET_ISSUES_FAILURE',
  SET_FILTERS: '@Issue/SET_FILTERS',
});

export type IssueFiltersStateType = 'open' | 'closed' | 'all';
export type IssueFiltersSortType = 'created' | 'updated' | 'comments';

export type GetIssuesPayload = {
  organization: string;
  repository: string;
  page?: number;
};

export function getIssuesAction(
  query: GetIssuesPayload,
): FSA<GetIssuesPayload> {
  return {
    type: IssueActionType.GET_ISSUES,
    payload: query,
  };
}

export type GetIssuesSuccessPayload = {
  data: ApiIssues;
};

export function getIssuesSuccessAction(
  data: ApiIssues,
): FSA<GetIssuesSuccessPayload> {
  return {
    type: IssueActionType.GET_ISSUES_SUCCESS,
    payload: {
      data,
    },
  };
}

export type GetIssuesFailurePayload = {
  error: Error;
};

export function getIssuesFailureAction(
  error: Error,
): FSA<GetIssuesFailurePayload> {
  return {
    type: IssueActionType.GET_ISSUES_FAILURE,
    payload: {
      error,
    },
  };
}

type Filters = {
  state?: IssueFiltersStateType;
  page?: number;
  sort?: IssueFiltersSortType;
};
export type SetFiltersPayload = {
  data: Filters;
};

export function setFilters(data: Filters): FSA<SetFiltersPayload> {
  return {
    type: IssueActionType.SET_FILTERS,
    payload: {
      data,
    },
  };
}
