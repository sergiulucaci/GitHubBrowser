import { Navigation } from 'react-native-navigation';

import { Screens } from './Screens';
import { Repository } from '../features/home/models/Repository';

export function setHomeNavigation(): void {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.Home,
              options: {
                topBar: {
                  drawBehind: true,
                  noBorder: true,
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function navigateToIssueList({
  componentId,
  repository,
}: {
  componentId: string;
  repository: Repository;
}): void {
  Navigation.push(componentId, {
    component: {
      name: Screens.IssueList,
      options: {
        topBar: {
          drawBehind: true,
          noBorder: true,
        },
      },
      passProps: {
        repository,
      },
    },
  });
}
