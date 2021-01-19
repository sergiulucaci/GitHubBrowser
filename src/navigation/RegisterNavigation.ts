import { Navigation } from 'react-native-navigation';

import Home from '../features/home/components/Home';
import IssueList from '../features/issue/components/IssueList';
import IssueDetail from '../features/issue/components/IssueDetail';
import IssueFilters from '../features/issue/components/IssueFilters';
import IssueBookmarkList from '../features/issue/components/IssueBookmarkList';
import reduxProviderHOC from '../store/ReduxProviderHOC';

import { Screens } from './Screens';

export default function registerNavigationScreens(): void {
  // Home
  Navigation.registerComponent(Screens.Home, reduxProviderHOC(Home));

  // Issue
  Navigation.registerComponent(Screens.IssueList, reduxProviderHOC(IssueList));
  Navigation.registerComponent(Screens.IssueDetail, reduxProviderHOC(IssueDetail));
  Navigation.registerComponent(Screens.IssueFilters, reduxProviderHOC(IssueFilters));
  Navigation.registerComponent(Screens.Bookmarks, reduxProviderHOC(IssueBookmarkList));
}
