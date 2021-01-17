import { takeLatest, call, put, all } from 'redux-saga/effects';
import config from '../../../config/Config';

import {
  IssueActionType,
  getIssuesSuccessAction,
  getIssuesFailureAction,
  GetIssuesPayload,
} from '../actions/Issue';

import { FSA } from '../../../store/FSA';
import { getIssues } from '../api/Issue';

export function* getIssuesActionSaga(
  action: FSA<GetIssuesPayload>,
): Generator<Object, void> {
  const {
    organization,
    repository,
    state,
    page,
    sort,
  } = action.payload;
  try {
    let qParsed = `${organization}/${repository}/issues?`;
    if (state) {
      qParsed = `${qParsed}&state=${state}`;
    }
    if (sort) {
      qParsed = `${qParsed}&sort=${state}`;
    }
    qParsed = `${qParsed}&page=${page}&per_page=10&access_token=${config.api.accessToken}`;

    const rs: any = yield call(getIssues, qParsed);
    yield put(getIssuesSuccessAction(rs));
  } catch (e) {
    yield put(getIssuesFailureAction(e));
  }
}

export function* issueSaga(): Generator<any, any, any> {
  yield all([
    takeLatest(IssueActionType.GET_ISSUES, getIssuesActionSaga),
  ]);
}
