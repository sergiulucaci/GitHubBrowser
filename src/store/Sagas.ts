import { all, fork } from 'redux-saga/effects';

import { homeSaga } from '../features/home/sagas/Home';

function* rootSaga(): Generator<any, any, any> {
  yield all([
    fork(homeSaga),
  ]);
}

export default rootSaga;
