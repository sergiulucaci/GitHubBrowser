import { FSA } from '../../../store/FSA';
import type { ApiHomes } from '../models/Home';

export const SessionsActionType = Object.freeze({
  GET_HOME: '@Home/GET_HOME',
  GET_HOME_SUCCESS: '@Home/GET_HOME_SUCCESS',
  GET_HOME_FAILURE: '@Home/GET_HOME_FAILURE',
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
