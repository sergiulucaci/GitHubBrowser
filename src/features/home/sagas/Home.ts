import { takeLatest, call, put, all } from 'redux-saga/effects';
import config from '../../../config/Config';

import {
  SessionsActionType,
  getHomeSuccessAction,
  getHomeFailureAction,
  GetHomePayload,
  getRepositorySuccessAction,
  getRepositoryFailureAction,
  GetRepositoryPayload,
} from '../actions/Home';
import { ApiHomes } from '../models/Home';

import { FSA } from '../../../store/FSA';
import { getHome } from '../api/Home';
import { getRepository } from '../api/Repository';

export function* sessionsActionSaga(
  action: FSA<GetHomePayload>,
): Generator<any, any, any> {
  try {
    const { query } = action.payload;
    const response: ApiHomes = {
      count: 0,
      next: null,
      previous: null,
      results: [{ id: 1 }],
    };
    const rs = yield call(getHome);

    yield put(
      getHomeSuccessAction({
        response,
        query,
      }),
    );
  } catch (error) {
    yield put(getHomeFailureAction(error));
  }
}

export function* getRepositoryActionSaga(
  action: FSA<GetRepositoryPayload>,
): Generator<Object, void> {
  const { organization, repository, page } = action.payload;
  try {
    let qParsed = '';
    if (organization) {
      qParsed = `org:${organization}`;
    } else if (repository) {
      qParsed = encodeURIComponent(`${repository} in:name`);
    }
    qParsed = `${qParsed}&page=${page}&per_page=10&access_token=${config.api.accessToken}`;

    const rs: any = yield call(getRepository, qParsed);
    yield put(getRepositorySuccessAction(rs));
  } catch (e) {
    yield put(getRepositoryFailureAction(e));
  }
}

export function* homeSaga(): Generator<any, any, any> {
  yield all([
    takeLatest(SessionsActionType.GET_HOME, sessionsActionSaga),
    takeLatest(SessionsActionType.GET_REPOSITORY, getRepositoryActionSaga),
  ]);
}
