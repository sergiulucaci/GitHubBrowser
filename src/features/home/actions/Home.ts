import { FSA } from '../../../store/FSA';
import type { ApiRepositories } from '../models/Repository';

export const SessionsActionType = Object.freeze({
  GET_REPOSITORY: '@Home/GET_REPOSITORY',
  GET_REPOSITORY_SUCCESS: '@Home/GET_REPOSITORY_SUCCESS',
  GET_REPOSITORY_FAILURE: '@Home/GET_REPOSITORY_FAILURE',
});

export type GetRepositoryPayload = {
  organization?: string,
  repository?: string,
  page?: number,
};

export function getRepositoryAction(query: GetRepositoryPayload): FSA<GetRepositoryPayload> {
  return {
    type: SessionsActionType.GET_REPOSITORY,
    payload: query,
  };
}

export type GetRepositorySuccessPayload = {
  data: ApiRepositories,
};

export function getRepositorySuccessAction(
  data: ApiRepositories,
): FSA<GetRepositorySuccessPayload> {
  return {
    type: SessionsActionType.GET_REPOSITORY_SUCCESS,
    payload: {
      data,
    },
  };
}

export type GetRepositoryFailurePayload = {
  error: Error,
};

export function getRepositoryFailureAction(
  error: Error,
): FSA<GetRepositoryFailurePayload> {
  return {
    type: SessionsActionType.GET_REPOSITORY_FAILURE,
    payload: {
      error,
    },
  };
}
