import axios from 'axios';
import {IDepartment} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, setHeaders} from '../helpers';

export const SET_DEPARTMENTS = 'SET_DEPARTMENTS';
export const SET_IS_LOADING_DEPARTMENTS = 'SET_IS_LOADING_DEPARTMENTS';
export const RESET_DEPARTMENTS = 'RESET_DEPARTMENTS';

interface IAction {
  type: string;
  payload: any;
}
export const setDepartments = (fees: IDepartment[]): IAction => ({
  type: SET_DEPARTMENTS,
  payload: fees,
});

export const setIsLoadingDepartments = (value: boolean): IAction => ({
  type: SET_IS_LOADING_DEPARTMENTS,
  payload: value,
});

export const resetDepartments = () => ({type: RESET_DEPARTMENTS});

export const fetchDepartments = (): any => (dispatch: any, getState: any) => {
  const {user} = getState();
  dispatch(setIsLoadingDepartments(true));
  axios
    .get(app.backendUrl + '/departments/', setHeaders(user.token))
    .then(res => {
      dispatch(setIsLoadingDepartments(false));
      dispatch({
        type: SET_DEPARTMENTS,
        payload: res.data.departments,
      });
    })
    .catch(error => {
      dispatch(setIsLoadingDepartments(false));
      errorHandler(error);
    });
};
