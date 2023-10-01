import {IAction, IBedReducer, IPatientReducer} from '../../interfaces';
import {
  RESET_PATIENTS,
  SET_IS_LOADING_PATIENTS,
  SET_PATIENTS,
} from '../actions/patients';

const initialState: IPatientReducer = {
  patients: [],
  isLoading: false,
};

const patientsReducer = (
  state = initialState,
  action: IAction,
): IPatientReducer => {
  switch (action.type) {
    case SET_PATIENTS:
      return {...state, patients: action.payload};
    case SET_IS_LOADING_PATIENTS:
      return {...state, isLoading: action.payload};
    case RESET_PATIENTS:
      return initialState;
    default:
      return state;
  }
};

export default patientsReducer;
