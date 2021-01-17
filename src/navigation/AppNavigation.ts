import { Navigation } from 'react-native-navigation';

import i18next from 'i18next';
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
          rightButtons: [
            {
              id: Screens.TopNavButtons.FilterIssues,
              text: i18next.t('issue.filtersOpenControl'),
            },
          ],
        },
      },
      passProps: {
        repository,
      },
    },
  });
}

export function navigateToIssueFilters({
  repository,
}: {
  repository: Repository;
}): void {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: Screens.IssueFilters,
            options: {
              topBar: {
                title: {
                  text: i18next.t('issue.filtersOpenControl'),
                },
                rightButtons: [
                  {
                    id: Screens.TopNavButtons.FilterIssuesDone,
                    text: i18next.t('issue.filtersDoneControl'),
                  },
                ],
              },
            },
            passProps: {
              repository,
            },
          },
        },
      ],
    },
  });
}
