import {IAction, IDepartment, IDepartmentReducer} from '../../interfaces';
import {
  SET_DEPARTMENTS,
  SET_IS_LOADING_DEPARTMENTS,
  RESET_DEPARTMENTS,
} from '../actions/departments';

const initialState: IDepartmentReducer = {
  departments: [],
  isLoading: false,
};

const departmentsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_DEPARTMENTS:
      return {...state, departments: action.payload as IDepartment[]};
    case SET_IS_LOADING_DEPARTMENTS:
      return {...state, isLoading: action.payload as boolean};
    case RESET_DEPARTMENTS:
      return initialState;
    default:
      return state;
  }
};

export default departmentsReducer;
