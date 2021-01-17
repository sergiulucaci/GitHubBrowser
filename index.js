import { Navigation } from 'react-native-navigation';

import './src/translations/i18n';
import registerNavigationScreens from './src/navigation/RegisterNavigation';
import { setHomeNavigation } from './src/navigation/AppNavigation';
import { customizeRelativeTime } from './src/utils/Moment';

Navigation.events().registerAppLaunchedListener(async () => {
  registerNavigationScreens();
  setHomeNavigation();
  customizeRelativeTime();
});
