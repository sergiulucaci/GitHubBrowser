import moment from 'moment';

// Customize thresholds in order to show d instead of days (eg: '1d' instead of 'a day ago')
export const customizeRelativeTime = (): void => {
  moment.relativeTimeThreshold('d', 30 * 12);
  moment.updateLocale('en', {
    relativeTime: {
      dd: '%dd',
    },
  });
};
