import {
  createStore,
  applyMiddleware,
  compose,
  Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import reducers from './Reducers';
import rootSaga from './Sagas';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware: Array<any> = [sagaMiddleware];

  const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store: Store = createStore(reducers, enhancer);
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
