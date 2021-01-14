import { Navigation } from 'react-native-navigation';

import registerNavigationScreens from './src/navigation/RegisterNavigation';
import { setHomeNavigation } from './src/navigation/AppNavigation';

Navigation.events().registerAppLaunchedListener(async () => {
  registerNavigationScreens();
  setHomeNavigation();
});
