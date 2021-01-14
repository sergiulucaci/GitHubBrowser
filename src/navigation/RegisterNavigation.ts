/**
 * @flow
 */

import { Navigation } from 'react-native-navigation';

import Home from '../features/home/Home';
import OrganizationList from '../features/organization/OrganizationList';

import { Screens } from './Screens';

export default function registerNavigationScreens(): void {
  // Home
  Navigation.registerComponent(Screens.Home, () => Home);

  // Organization
  Navigation.registerComponent(Screens.OrganizationList, () => OrganizationList);
}
