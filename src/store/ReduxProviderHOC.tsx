import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './ConfigureStore';

const { store, persistor } = configureStore();

export type ComponentProvider = () => React.ComponentType<any>;

export default function reduxProviderHOC(
  Component: React.ComponentType<any>,
): ComponentProvider {
  return () => (props: any) => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
}
