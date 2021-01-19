import { handleActions } from 'redux-actions';
import { IssueActionType } from '../actions/Issue';
import {
  commentsMapper,
  IssueComment,
  IssueComments,
} from '../models/IssueComment';

export type IssueCommentsStateFiltersType = {
  page: number;
};

export type IssueCommentStateType = {
  isFetching: boolean;
  isFetched: boolean;
  error: boolean;
  errorMessage?: string;
  filters: IssueCommentsStateFiltersType;
  payload: IssueComments;
};

export const initialState: IssueCommentStateType = Object.freeze({
  isFetching: false,
  isFetched: false,
  error: false,
  filters: {
    page: 1,
  },
  payload: [],
});

// GitHub API returns duplicates in some cases (facepalm)
// As of Jan 18th 2021, check out "481989177" id from page 22 and 23 from the following endpoint:
// GET /repos/wix/react-native-navigation/issues?&state=closed&sort=comments&page=23&per_page=10
const getUniqueListBy = (
  arr: Array<Object>,
  key: string,
): Array<IssueComment> => [
  ...new Map(arr.map((item: any) => [item[key], item])).values(),
];

const issue = handleActions(
  {
    [IssueActionType.GET_ISSUE_COMMENTS]: (
      state: IssueCommentStateType,
      action: { payload: { page: number } },
    ): IssueCommentStateType => {
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
    [IssueActionType.GET_ISSUE_COMMENTS_SUCCESS]: (
      state: IssueCommentStateType,
      action: { payload: any }, // Should be "action: FSA<GetIssueCommentsSuccessPayload>"
    ): IssueCommentStateType => {
      const dataMapped = commentsMapper(action.payload.data);
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
    [IssueActionType.GET_ISSUE_COMMENTS_FAILURE]: (
      state: IssueCommentStateType,
      action: { payload: any }, // Should be "action: FSA<Error>"
    ): IssueCommentStateType => ({
      ...state,
      isFetching: false,
      isFetched: false,
      error: true,
      errorMessage: action.payload.error.message,
    }),
  },
  initialState,
);

export default issue;
