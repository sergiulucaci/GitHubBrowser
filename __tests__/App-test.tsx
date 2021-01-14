import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../src/features/home/Home';

it('renders correctly', () => {
  renderer.create(<Home componentId="Component 1" />);
});
