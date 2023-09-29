import axios from 'axios';
import {ITestResult} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, setHeaders} from '../helpers';

export const SET_PATIENT_TEST_RESULTS = 'SET_TEST_RESULTS';
export const SET_NURSE_TEST_RESULTS = 'SET_TEST_RESULTS';
export const SET_IS_LOADING_TEST_RESULTS = 'SET_IS_LOADING_TEST_RESULTS';
export const RESET_TEST_RESULTS = 'RESET_TEST_RESULTS';

interface IAction {
  type: string;
  payload: any;
}
export const setPatientTestResults = (results: ITestResult[]): IAction => ({
  type: SET_PATIENT_TEST_RESULTS,
  payload: results,
});

export const setNurseTestResults = (results: ITestResult[]): IAction => ({
  type: SET_NURSE_TEST_RESULTS,
  payload: results,
});

export const setIsLoadingTestResults = (value: boolean): IAction => ({
  type: SET_IS_LOADING_TEST_RESULTS,
  payload: value,
});

export const resetTestResults = () => ({type: RESET_TEST_RESULTS});

export const fetchPatientTestResults =
  (): any => (dispatch: any, getState: any) => {
    const {user} = getState();
    dispatch(setIsLoadingTestResults(true));
    axios
      .get(app.backendUrl + '/tests/patient', setHeaders(user.token))
      .then(res => {
        dispatch(setIsLoadingTestResults(false));
        dispatch(setPatientTestResults(res.data.testResults));
      })
      .catch(error => {
        dispatch(setIsLoadingTestResults(false));
        errorHandler(error);
      });
  };

export const fetchNurseTestResults =
  (): any => (dispatch: any, getState: any) => {
    const {user} = getState();
    dispatch(setIsLoadingTestResults(true));
    axios
      .get(app.backendUrl + '/tests/nurse', setHeaders(user.token))
      .then(res => {
        dispatch(setIsLoadingTestResults(false));
        dispatch(setNurseTestResults(res.data.testResults));
      })
      .catch(error => {
        dispatch(setIsLoadingTestResults(false));
        errorHandler(error);
      });
  };
