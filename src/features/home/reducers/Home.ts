import { handleActions } from 'redux-actions';
import {
  HomeActionType,
} from '../actions/Home';
import {
  Repositories,
  repositoriesMapper,
  Repository,
} from '../models/Repository';

export type HomeStateType = {
  isFetching: boolean;
  isFetched: boolean;
  error: boolean;
  errorMessage?: string;
  page: number;
  payload: Repositories;
};

export const initialState: HomeStateType = Object.freeze({
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

// GitHub API returns duplicates in some cases (facepalm)
const getUniqueListBy = (arr: Array<Object>, key: string): Array<Repository> => [
  ...new Map(arr.map((item: any) => [item[key], item])).values(),
];

const home = handleActions(
  {
    [HomeActionType.GET_REPOSITORY]: (
      state: HomeStateType,
      action: { payload: { page: number } },
    ): HomeStateType => {
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
      state: HomeStateType,
      action: { payload: any }, // Should be "action: FSA<GetRepositorySuccessPayload>"
    ): HomeStateType => {
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
              items: getUniqueListBy([...state.payload.items, ...dataMapped.items], 'id'),
            }
            : dataMapped,
      };
    },
    [HomeActionType.GET_REPOSITORY_FAILURE]: (
      state: HomeStateType,
      action: { payload: any }, // // Should be "action: FSA<Error>"
    ): HomeStateType => ({
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
