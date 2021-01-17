import { handleActions } from 'redux-actions';
import {
  HomeActionType,
} from '../actions/Home';
import {
  Repositories,
  repositoriesMapper,
} from '../models/Repository';

export type RepositoryStateType = {
  isFetching: boolean;
  isFetched: boolean;
  error: boolean;
  errorMessage?: string;
  page: number;
  payload: Repositories;
};

export const initialState: RepositoryStateType = Object.freeze({
  isFetching: false,
  isFetched: false,
  error: false,
  page: 1,
  payload: {
    incompleteResults: false,
    items: [],
    totalCount: 0,
  },
});

const home = handleActions(
  {
    [HomeActionType.GET_REPOSITORY]: (
      state: RepositoryStateType,
      action: { payload: { page: number } },
    ): RepositoryStateType => {
      const firstLoad = action.payload.page < 2;
      return {
        ...state,
        isFetching: firstLoad,
        error: false,
        page: action.payload.page,
        payload: {
          incompleteResults: firstLoad
            ? false
            : state.payload.incompleteResults,
          items: firstLoad ? [] : state.payload.items,
          totalCount: firstLoad ? 0 : state.payload.totalCount,
        },
      };
    },
    [HomeActionType.GET_REPOSITORY_SUCCESS]: (
      state: RepositoryStateType,
      action: { payload: any }, // Should be "action: FSA<GetRepositorySuccessPayload>"
    ): RepositoryStateType => {
      const dataMapped = repositoriesMapper(action.payload.data);
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        error: false,
        payload:
          state.page > 1
            ? {
              ...dataMapped,
              items: [...state.payload.items, ...dataMapped.items],
            }
            : dataMapped,
      };
    },
    [HomeActionType.GET_REPOSITORY_FAILURE]: (
      state: RepositoryStateType,
      action: { payload: any }, // // Should be "action: FSA<Error>"
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
