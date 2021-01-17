import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './Reducers';
import rootSaga from './Sagas';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware: Array<any> = [sagaMiddleware];

  const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(rootSaga);

  return { store };
};
