import { handleActions } from 'redux-actions';
import { IssueActionType } from '../actions/Issue';
import {Issue, Issues, issuesMapper} from '../models/Issue';
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
});

// GitHub returns duplicates (facepalm)
// As of Jan 18th 2021, check out "481989177" id from page 22 and 23 from the following endpoint:
// GET /repos/wix/react-native-navigation/issues?&state=closed&sort=comments&page=23&per_page=10
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
  },
  initialState,
);

export default issue;
