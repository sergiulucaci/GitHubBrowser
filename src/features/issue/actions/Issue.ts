import { FSA } from '../../../store/FSA';
import type { ApiIssues } from '../models/Issue';

export const IssueActionType = Object.freeze({
  GET_ISSUES: '@Issue/GET_ISSUES',
  GET_ISSUES_SUCCESS: '@Issue/GET_ISSUES_SUCCESS',
  GET_ISSUES_FAILURE: '@Issue/GET_ISSUES_FAILURE',
});

export type GetIssuesPayload = {
  organization: string,
  repository: string,
  state?: 'open' | 'closed' | 'all',
  page?: number,
  sort?: 'created' | 'updated' | 'comments',
};

export function getIssuesAction(query: GetIssuesPayload): FSA<GetIssuesPayload> {
  return {
    type: IssueActionType.GET_ISSUES,
    payload: query,
  };
}

export type GetIssuesSuccessPayload = {
  data: ApiIssues,
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
  error: Error,
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
