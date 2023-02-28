import axios from 'axios';
import {IDepartment} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, setHeaders} from '../helpers';

export const SET_BEDS = 'SET_BEDS';
export const SET_IS_LOADING_BEDS = 'SET_IS_LOADING_BEDS';
export const RESET_BEDS = 'RESET_BEDS';

interface IAction {
  type: string;
  payload: any;
}
export const setBeds = (fees: IDepartment[]): IAction => ({
  type: SET_BEDS,
  payload: fees,
});

export const setIsLoadingBeds = (value: boolean): IAction => ({
  type: SET_IS_LOADING_BEDS,
  payload: value,
});

export const resetBeds = () => ({type: RESET_BEDS});

export const fetchBeds = (): any => (dispatch: any, getState: any) => {
  const {user} = getState();
  dispatch(setIsLoadingBeds(true));
  axios
    .get(app.backendUrl + '/beds/', setHeaders(user.token))
    .then(res => {
      dispatch(setIsLoadingBeds(false));
      dispatch({
        type: SET_BEDS,
        payload: res.data.beds,
      });
    })
    .catch(error => {
      dispatch(setIsLoadingBeds(false));
      errorHandler(error);
    });
};
