import {showMessage} from 'react-native-flash-message';
import theme from '../theme';
import NetInfo from '@react-native-community/netinfo';
import {Constants} from '../lib/constant';

export const onMessageShow = (msg, type = 'danger') => {
  showMessage({
    message: msg,
    autoHide: true,
    floating: true,
    type: type,
  });
};

export const errorMessage = msg => {
  onMessageShow(msg, theme.colors.RED);
};

export const successMessage = msg => {
  onMessageShow(msg, theme.colors.GREEN);
};

export const delay = (time = 3000) =>
  new Promise(resolve => setTimeout(resolve, time));

export const isConnected = async () => {
  let state = await NetInfo.fetch();
  let status = state.isInternetReachable;
  return status;
};

export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};
