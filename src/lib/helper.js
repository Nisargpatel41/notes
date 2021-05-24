import {showMessage} from 'react-native-flash-message';
import theme from '../theme';
import NetInfo from '@react-native-community/netinfo';

export const onMessageShow = (msg, type = 'danger') => {
  showMessage({
    message: msg,
    autoHide: true,
    floating: true,
    type: type,
    duration: 1000,
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

export const UUID = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
};

export const arrayIfKeySame = (data, key) => {
  return [...new Map(data.map(x => [key(x), x])).values()];
};
