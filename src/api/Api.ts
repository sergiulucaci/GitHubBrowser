import { Alert } from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import i18next from 'i18next';

import config from '../config/Config';
import ErrorService from '../errors/ErrorService';

const checkForInternetConnection = async () => {
  // We cannot use network reducer because for immediate requests (like clicking a friendship notification
  // which opens the contact list) the reducer is not up-to-date.
  const state = await NetInfo.fetch();
  if (!state.isConnected && !state.isInternetReachable) {
    Alert.alert(
      i18next.t('network.alertNoNetworkTitle'),
      i18next.t('network.alertNoNetworkSubtitle'),
    );
  }
};

type CallApiConfigProps = {
  apiConfig: {
    headers?: Object,
    data?: Object,
    url: string,
    method: 'get',
  },
  customErrorHandler?: boolean,
};

const callApi = async ({
  apiConfig,
  customErrorHandler = false,
}: CallApiConfigProps) => {
  await checkForInternetConnection();
  const token = config.api.accessToken;
  const axiosConfig = {
    baseURL: config.api.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: config.api.baseUrlAcceptedVersion,
      ...token ? { Authorization: `token ${token}` } : {},
    },
    ...apiConfig,
  };

  try {
    const response = await axios(axiosConfig);
    if (!response) {
      const error = i18next.t('error.apiErrorMessage');
      if (!customErrorHandler) {
        await ErrorService.sendCrashReport({ error });
      }
      return Promise.reject(new Error(error));
    }
    return Promise.resolve(response.data || response);
  } catch (error) {
    if (error.response.status === 403) {
      Alert.alert(
        i18next.t('error.configureEnvFileAccordinglyTitle'),
        i18next.t('error.configureEnvFileAccordinglyDescription'),
      );
    }
    await ErrorService.sendCrashReport({ error });
    return Promise.reject(new Error(error));
  }
};

export { callApi };
