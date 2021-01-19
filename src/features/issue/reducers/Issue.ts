import { handleActions } from 'redux-actions';
import { persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

import { IssueActionType } from '../actions/Issue';
import {
  Issue, Issues, issuesMapper, IssueWithRepository,
} from '../models/Issue';
import { IssueConstants } from '../constants/IssueConstants';

export type IssueStateFiltersType = {
  page: number;
  state: string;
  sort: string;
};

export type IssueStateType = {
  isFetching: boolean;
  isFetched: boolean;
  error: boolean;
  errorMessage?: string;
  filters: IssueStateFiltersType;
  payload: Issues;
  bookmarks: Array<IssueWithRepository>;
};

export const initialState: IssueStateType = Object.freeze({
  isFetching: false,
  isFetched: false,
  error: false,
  filters: {
    page: 1,
    state: IssueConstants.Filters.FILTER_BY_OPEN,
    sort: IssueConstants.Filters.SORT_BY_CREATED,
  },
  payload: [],
  bookmarks: [],
});

// GitHub API returns duplicates in some cases (facepalm)
const getUniqueListBy = (arr: Array<Object>, key: string): Array<Issue> => [
  ...new Map(arr.map((item: any) => [item[key], item])).values(),
];

const issue = handleActions(
  {
    [IssueActionType.GET_ISSUES]: (
      state: IssueStateType,
      action: { payload: { page: number } },
    ): IssueStateType => {
      const firstLoad = action.payload.page < 2;
      return {
        ...state,
        isFetching: firstLoad,
        error: false,
        filters: {
          ...state.filters,
          page: action.payload.page,
        },
        payload: firstLoad ? [] : state.payload,
      };
    },
    [IssueActionType.GET_ISSUES_SUCCESS]: (
      state: IssueStateType,
      action: { payload: any }, // Should be "action: FSA<GetIssueSuccessPayload>"
    ): IssueStateType => {
      const dataMapped = issuesMapper(action.payload.data);
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        error: false,
        payload:
          state.filters.page > 1
            ? getUniqueListBy([...state.payload, ...dataMapped], 'id')
            : dataMapped,
      };
    },
    [IssueActionType.GET_ISSUES_FAILURE]: (
      state: IssueStateType,
      action: { payload: any }, // Should be "action: FSA<Error>"
    ): IssueStateType => ({
      ...state,
      isFetching: false,
      isFetched: false,
      error: true,
      errorMessage: action.payload.error.message,
    }),
    [IssueActionType.SET_FILTERS]: (
      state: IssueStateType,
      action: { payload: any }, // Should be "action: FSA<SetFiltersPayload>"
    ): IssueStateType => ({
      ...state,
      filters: {
        ...state.filters,
        ...action.payload.data,
      },
    }),
    [IssueActionType.ADD_ISSUE_TO_BOOKMARKS]: (
      state: IssueStateType,
      action: { payload: any }, // Should be "action: FSA<AddIssueToBookmarksPayload>"
    ): IssueStateType => ({
      ...state,
      bookmarks: [
        ...state.bookmarks,
        action.payload.data,
      ],
    }),
    [IssueActionType.REMOVE_ISSUE_FROM_BOOKMARKS]: (
      state: IssueStateType,
      action: { payload: any }, // Should be "action: FSA<RemoveIssueToBookmarksPayload>"
    ): IssueStateType => ({
      ...state,
      bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== action.payload.id),
    }),
  },
  initialState,
);

const persistConfig = {
  key: 'issue',
  storage,
  whitelist: ['bookmarks'],
};

export default persistReducer<IssueStateType, any>(persistConfig, issue);
