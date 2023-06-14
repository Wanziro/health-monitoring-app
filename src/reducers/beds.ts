import {IAction, IBedReducer, IBed} from '../../interfaces';
import {SET_BEDS, SET_IS_LOADING_BEDS, RESET_BEDS} from '../actions/beds';

const initialState: IBedReducer = {
  beds: [],
  isLoading: false,
};

const bedsReducer = (state = initialState, action: IAction): IBedReducer => {
  switch (action.type) {
    case SET_BEDS:
      return {...state, beds: action.payload};
    case SET_IS_LOADING_BEDS:
      return {...state, isLoading: action.payload};
    case RESET_BEDS:
      return initialState;
    default:
      return state;
  }
};

export default bedsReducer;
