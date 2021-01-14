/**
 * @flow
 */

import { Navigation } from 'react-native-navigation';

import Home from '../features/home/components/Home';
import OrganizationList from '../features/organization/OrganizationList';
import reduxProviderHOC from '../store/ReduxProviderHOC';

import { Screens } from './Screens';

export default function registerNavigationScreens(): void {
  // Home
  Navigation.registerComponent(Screens.Home, reduxProviderHOC(Home));

  // Organization
  Navigation.registerComponent(Screens.OrganizationList, reduxProviderHOC(OrganizationList));
}
