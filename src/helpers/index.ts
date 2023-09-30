import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {resetUser} from '../actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {fetchDepartments} from '../actions/departments';
import {fetchBeds} from '../actions/beds';

//custom dispatcher hook
export const useResetUser = (): any => {
  const dispatch = useDispatch();
  return (payload: any) => {
    dispatch(resetUser());
  };
};

export const useLoadBasicData = (): any => {
  const dispatch = useDispatch();
  return (payload: any) => {
    dispatch(fetchDepartments());
    dispatch(fetchBeds());
  };
};

export const toastMessage = (
  type: 'info' | 'error' | 'success',
  message: string,
) => {
  if (type == 'info') {
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: message,
      position: 'bottom',
    });
  }
  if (type == 'error') {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
      position: 'bottom',
    });
  }
  if (type == 'success') {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      position: 'bottom',
    });
  }
};

export const toastMessage2 = (
  type: 'info' | 'error' | 'success',
  message: string,
) => {
  if (type == 'info') {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Info',
      textBody: message,
      button: 'OK',
    });
  }
  if (type == 'error') {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: message,
      button: 'OK',
    });
  }
  if (type == 'success') {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: message,
      button: 'OK',
    });
  }
};

export const errorHandler = (error: any) => {
  if (error?.response?.data?.msg) {
    toastMessage('error', error.response.data.msg);
  } else if (error.message) {
    toastMessage('error', error.message);
  } else {
    toastMessage('error', error);
  }
  handleAuthError(error);
};

export const returnErroMessage = (error: any) => {
  if (error?.response?.data?.msg) {
    return error.response.data.msg;
  } else if (error.message) {
    return error.message;
  } else {
    return error;
  }
};

export const errorHandler2 = (error: any) => {
  if (error?.response?.data?.msg) {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.msg,
      button: 'OK',
    });
  } else if (error.message) {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.message,
      button: 'OK',
    });
  } else {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error,
      button: 'OK',
    });
  }
  handleAuthError(error);
};

export const handleAuthError = (error: any) => {
  if (error?.response?.status == 401) {
    AsyncStorage.clear();
  }
};

export const setHeaders = (token: string) => {
  return {
    headers: {
      'access-token': token,
    },
  };
};
