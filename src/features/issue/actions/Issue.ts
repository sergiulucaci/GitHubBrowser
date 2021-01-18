import { FSA } from '../../../store/FSA';
import type { ApiIssues } from '../models/Issue';
import { ApiIssueComments } from '../models/IssueComment';

export const IssueActionType = Object.freeze({
  GET_ISSUES: '@Issue/GET_ISSUES',
  GET_ISSUES_SUCCESS: '@Issue/GET_ISSUES_SUCCESS',
  GET_ISSUES_FAILURE: '@Issue/GET_ISSUES_FAILURE',
  GET_ISSUE_COMMENTS: '@Issue/GET_ISSUE_COMMENTS',
  GET_ISSUE_COMMENTS_SUCCESS: '@Issue/GET_ISSUE_COMMENTS_SUCCESS',
  GET_ISSUE_COMMENTS_FAILURE: '@Issue/GET_ISSUE_COMMENTS_FAILURE',
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

export type GetIssueCommentsPayload = {
  organization: string;
  repository: string;
  issueNumber: number;
  page?: number;
};

export function getIssueCommentsAction(
  query: GetIssueCommentsPayload,
): FSA<GetIssueCommentsPayload> {
  return {
    type: IssueActionType.GET_ISSUE_COMMENTS,
    payload: query,
  };
}

export type GetIssueCommentsSuccessPayload = {
  data: ApiIssueComments;
};

export function getIssueCommentsSuccessAction(
  data: ApiIssueComments,
): FSA<GetIssueCommentsSuccessPayload> {
  return {
    type: IssueActionType.GET_ISSUE_COMMENTS_SUCCESS,
    payload: {
      data,
    },
  };
}

export type GetIssueCommentsFailurePayload = {
  error: Error;
};

export function getIssueCommentsFailureAction(
  error: Error,
): FSA<GetIssuesFailurePayload> {
  return {
    type: IssueActionType.GET_ISSUE_COMMENTS_FAILURE,
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
