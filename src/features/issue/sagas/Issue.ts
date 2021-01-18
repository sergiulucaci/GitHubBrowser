import {
  takeLatest,
  call,
  put,
  all,
  select,
} from 'redux-saga/effects';

import {
  IssueActionType,
  getIssuesSuccessAction,
  getIssuesFailureAction,
  GetIssuesPayload, GetIssueCommentsPayload, getIssueCommentsSuccessAction, getIssueCommentsFailureAction,
} from '../actions/Issue';
import { FSA } from '../../../store/FSA';
import { getIssueComments, getIssues } from '../api/Issue';
import { selectIssueFilters } from '../selectors/Issue';

export function* getIssuesActionSaga(
  action: FSA<GetIssuesPayload>,
): Generator<Object, void> {
  const { organization, repository, page } = action.payload;
  const filters: any = yield select(selectIssueFilters);
  const { state, sort } = filters;

  try {
    let qParsed = '';
    if (state) {
      qParsed = `${qParsed}&state=${state}`;
    }
    if (sort) {
      qParsed = `${qParsed}&sort=${sort}`;
    }
    qParsed = `${qParsed}&page=${page}&per_page=10`;

    const rs: any = yield call(getIssues, { query: qParsed, organization, repository });
    yield put(getIssuesSuccessAction(rs));
  } catch (e) {
    yield put(getIssuesFailureAction(e));
  }
}

export function* getIssueCommentsActionSaga(
  action: FSA<GetIssueCommentsPayload>,
): Generator<Object, void> {
  const {
    organization,
    repository,
    page,
    issueNumber,
  } = action.payload;

  try {
    const query = `page=${page}&per_page=10`;
    const rs: any = yield call(getIssueComments, {
      query,
      organization,
      repository,
      issueNumber,
    });
    yield put(getIssueCommentsSuccessAction(rs));
  } catch (e) {
    yield put(getIssueCommentsFailureAction(e));
  }
}

export function* issueSaga(): Generator<any, any, any> {
  yield all([
    takeLatest(IssueActionType.GET_ISSUES, getIssuesActionSaga),
    takeLatest(IssueActionType.GET_ISSUE_COMMENTS, getIssueCommentsActionSaga),
  ]);
}
