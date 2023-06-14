import {
  SET_USER_NAMES,
  SET_USER_EMAIL,
  SET_USER_TOKEN,
  SET_USER_ROLE,
  RESET_USER,
  SET_USER_PHONE,
} from '../actions/user';
import {IAction, IUser} from '../interfaces';

const initialState: IUser = {
  token: '',
  fullName: '',
  email: '',
  phone: '',
  role: '',
};

const user = (state: IUser = initialState, action: IAction): IUser => {
  switch (action.type) {
    case SET_USER_NAMES:
      return {...state, fullName: action.payload};
    case SET_USER_EMAIL:
      return {...state, email: action.payload};
    case SET_USER_PHONE:
      return {...state, phone: action.payload};
    case SET_USER_ROLE:
      return {...state, role: action.payload};
    case SET_USER_TOKEN:
      return {...state, token: action.payload};
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
