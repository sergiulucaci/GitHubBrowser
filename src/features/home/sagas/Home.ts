import { takeLatest, put, all } from 'redux-saga/effects';

import {
  getHomeSuccessAction,
  getHomeFailureAction,
  SessionsActionType,
  GetHomePayload,
} from '../actions/Home';
import { ApiHomes } from '../models/Home';

import { FSA } from '../../../store/FSA';

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

export function* homeSaga(): Generator<any, any, any> {
  yield all([
    takeLatest(SessionsActionType.GET_HOME, sessionsActionSaga),
  ]);
}
