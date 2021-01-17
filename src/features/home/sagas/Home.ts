import { takeLatest, call, put, all } from 'redux-saga/effects';
import config from '../../../config/Config';

import {
  HomeActionType,
  getRepositorySuccessAction,
  getRepositoryFailureAction,
  GetRepositoryPayload,
} from '../actions/Home';

import { FSA } from '../../../store/FSA';
import { getRepository } from '../api/Repository';

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
    takeLatest(HomeActionType.GET_REPOSITORY, getRepositoryActionSaga),
  ]);
}
