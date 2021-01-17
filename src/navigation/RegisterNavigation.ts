import { Navigation } from 'react-native-navigation';

import Home from '../features/home/components/Home';
import IssueList from '../features/issue/components/IssueList';
import reduxProviderHOC from '../store/ReduxProviderHOC';

import { Screens } from './Screens';

export default function registerNavigationScreens(): void {
  // Home
  Navigation.registerComponent(Screens.Home, reduxProviderHOC(Home));

  // Issue
  Navigation.registerComponent(Screens.IssueList, reduxProviderHOC(IssueList));
}
