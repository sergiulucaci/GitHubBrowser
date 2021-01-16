import { handleActions } from 'redux-actions';
import { SessionsActionType } from '../actions/Home';
import { ApiRepository } from '../models/Repository';

export type RepositoryStateType = {
  isFetching: boolean;
  isFetched: boolean;
  error: boolean;
  errorMessage?: string;
  payload: {
    incomplete_results: boolean;
    items: ApiRepository[];
    total_count: null;
  };
};

export const initialState: RepositoryStateType = Object.freeze({
  isFetching: false,
  isFetched: false,
  error: false,
  payload: {
    incomplete_results: false,
    items: [],
    total_count: null,
  },
});

const home = handleActions(
  {
    [SessionsActionType.GET_REPOSITORY]: (
      state: RepositoryStateType,
      action,
    ): RepositoryStateType => ({
      ...state,
      isFetching: true,
      error: false,
      payload: {
        incomplete_results: false,
        items: [],
        total_count: null,
      },
    }),
    [SessionsActionType.GET_REPOSITORY_SUCCESS]: (
      state,
      action: { payload: any },
    ): RepositoryStateType => ({
      ...state,
      isFetching: false,
      isFetched: true,
      error: false,
      // TODO: Add a mapper for APIFeaturedClass
      payload: action.payload.data,
    }),
    [SessionsActionType.GET_REPOSITORY_FAILURE]: (
      state,
      action: { payload: any },
    ): RepositoryStateType => ({
      ...state,
      isFetching: false,
      isFetched: false,
      error: true,
      errorMessage: action.payload.error.message,
    }),
  },
  initialState,
);

export default home;
