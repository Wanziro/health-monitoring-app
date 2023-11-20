import axios from 'axios';
import {GraphOptionsType, ITestResult} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, setHeaders} from '../helpers';

export const SET_PATIENT_TEST_RESULTS = 'SET_PATIENT_TEST_RESULTS';
export const SET_PATIENT_GRAPH_RESULTS = 'SET_PATIENT_GRAPH_RESULTS';
export const SET_NURSE_TEST_RESULTS = 'SET_NURSE_TEST_RESULTS';
export const SET_NURSE_GRAPH_RESULTS = 'SET_NURSE_GRAPH_RESULTS';
export const SET_IS_LOADING_TEST_RESULTS = 'SET_IS_LOADING_TEST_RESULTS';
export const SET_SELECTED_TEST_OPTION = 'SET_SELECTED_TEST_OPTION';
export const RESET_TEST_RESULTS = 'RESET_TEST_RESULTS';

interface IAction {
  type: string;
  payload: any;
}
export const setPatientTestResults = (results: ITestResult[]): IAction => ({
  type: SET_PATIENT_TEST_RESULTS,
  payload: results,
});

export const setSelectedTestOption = (option: GraphOptionsType): IAction => ({
  type: SET_SELECTED_TEST_OPTION,
  payload: option,
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

export const fetchPatientGraphResults =
  (): any => (dispatch: any, getState: any) => {
    const {user} = getState();
    const {testResults} = getState();
    dispatch(setIsLoadingTestResults(true));
    axios
      .get(
        app.backendUrl + '/tests/patient/graph/' + testResults.selectedOption,
        setHeaders(user.token),
      )
      .then(res => {
        dispatch(setIsLoadingTestResults(false));
        dispatch({
          type: SET_PATIENT_GRAPH_RESULTS,
          payload: res.data.testResults,
        });
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

export const fetchNurseGraphResults =
  (): any => (dispatch: any, getState: any) => {
    const {user} = getState();
    const {testResults} = getState();
    dispatch(setIsLoadingTestResults(true));
    axios
      .get(
        app.backendUrl + '/tests/nurse/graph/' + testResults.selectedOption,
        setHeaders(user.token),
      )
      .then(res => {
        dispatch(setIsLoadingTestResults(false));
        dispatch({
          type: SET_NURSE_GRAPH_RESULTS,
          payload: res.data.testResults,
        });
      })
      .catch(error => {
        dispatch(setIsLoadingTestResults(false));
        errorHandler(error);
      });
  };
