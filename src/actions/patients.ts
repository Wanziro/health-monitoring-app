import axios from 'axios';
import {app} from '../constants/app';
import {errorHandler, setHeaders} from '../helpers';
import {IPatient} from '../interfaces';

export const SET_PATIENTS = 'SET_PATIENTS';
export const SET_IS_LOADING_PATIENTS = 'SET_IS_LOADING_PATIENTS';
export const RESET_PATIENTS = 'RESET_PATIENTS';

interface IAction {
  type: string;
  payload: any;
}
export const setPatients = (patients: IPatient[]): IAction => ({
  type: SET_PATIENTS,
  payload: patients,
});

export const setIsLoadingPatients = (value: boolean): IAction => ({
  type: SET_IS_LOADING_PATIENTS,
  payload: value,
});

export const resetPatients = () => ({type: RESET_PATIENTS});

export const fetchPatients = (): any => (dispatch: any, getState: any) => {
  const {user} = getState();
  dispatch(setIsLoadingPatients(true));
  axios
    .get(app.backendUrl + '/patients', setHeaders(user.token))
    .then(res => {
      dispatch(setIsLoadingPatients(false));
      dispatch(setPatients(res.data.patients));
    })
    .catch(error => {
      dispatch(setIsLoadingPatients(false));
      errorHandler(error);
    });
};
