import { all, fork } from 'redux-saga/effects';

import { homeSaga } from '../features/home/sagas/Home';
import { issueSaga } from '../features/issue/sagas/Issue';

function* rootSaga(): Generator<any, any, any> {
  yield all([
    fork(homeSaga),
    fork(issueSaga),
  ]);
}

export default rootSaga;
