import { FSA } from '../../../store/FSA';
import type { ApiHomes } from '../models/Home';
import type { ApiRepositories } from '../models/Repository';

export const SessionsActionType = Object.freeze({
  GET_HOME: '@Home/GET_HOME',
  GET_HOME_SUCCESS: '@Home/GET_HOME_SUCCESS',
  GET_HOME_FAILURE: '@Home/GET_HOME_FAILURE',
  GET_REPOSITORY: '@Home/GET_REPOSITORY',
  GET_REPOSITORY_SUCCESS: '@Home/GET_REPOSITORY_SUCCESS',
  GET_REPOSITORY_FAILURE: '@Home/GET_REPOSITORY_FAILURE',
});

export type HomeQuery = {
  limit?: number,
  startDate?: string,
  endDate?: string,
};

export type GetHomePayload = {
  query?: HomeQuery,
}

export type GetHomeActionPayload = {
  token?: string,
};

export function getHomeAction(): FSA<GetHomeActionPayload> {
  return {
    type: SessionsActionType.GET_HOME,
    payload: {},
  };
}

export type GetHomeSuccessPayload = {
  response: ApiHomes
  query?: HomeQuery,
};

export function getHomeSuccessAction(
  data: GetHomeSuccessPayload,
): FSA<GetHomeSuccessPayload> {
  return {
    type: SessionsActionType.GET_HOME_SUCCESS,
    payload: data,
  };
}

export function getHomeFailureAction(error: Error): FSA<{ error: Error }> {
  return {
    type: SessionsActionType.GET_HOME_FAILURE,
    payload: {
      error,
    },
  };
}

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
): FSA<{ error: Error }> {
  return {
    type: SessionsActionType.GET_REPOSITORY_FAILURE,
    payload: {
      error,
    },
  };
}
