import { Navigation } from 'react-native-navigation';
import { Screens } from './Screens';

export function setHomeNavigation(): void {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.Home,
            },
          },
        ],
      },
    },
  });
}

export function navigateToOrganizationList(componentId: string): void {
  Navigation.push(componentId, {
    component: {
      name: Screens.OrganizationList,
      options: {
        topBar: {
          title: {
            text: 'Organization List',
          },
        },
      },
    },
  });
}
