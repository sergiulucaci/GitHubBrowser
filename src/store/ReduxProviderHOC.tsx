import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './ConfigureStore';

const { store } = configureStore();

export type ComponentProvider = () => React.ComponentType<any>;

export default function reduxProviderHOC(
  Component: React.ComponentType<any>,
): ComponentProvider {
  return () => (props: any) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}
