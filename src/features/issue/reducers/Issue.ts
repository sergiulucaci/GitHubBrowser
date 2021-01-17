import { handleActions } from 'redux-actions';
import { IssueActionType } from '../actions/Issue';
import { Issues, issuesMapper } from '../models/Issue';

export type IssueStateType = {
  isFetching: boolean;
  isFetched: boolean;
  error: boolean;
  errorMessage?: string;
  page: number;
  payload: Issues;
};

export const initialState: IssueStateType = Object.freeze({
  isFetching: false,
  isFetched: false,
  error: false,
  page: 1,
  payload: [],
});

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
        page: action.payload.page,
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
          state.page > 1 ? [...state.payload, ...dataMapped] : dataMapped,
      };
    },
    [IssueActionType.GET_ISSUES_FAILURE]: (
      state: IssueStateType,
      action: { payload: any }, // // Should be "action: FSA<Error>"
    ): IssueStateType => ({
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
