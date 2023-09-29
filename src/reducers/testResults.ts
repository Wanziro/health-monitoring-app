import {IAction, ITestResultsReducer} from '../../interfaces';
import {
  RESET_TEST_RESULTS,
  SET_IS_LOADING_TEST_RESULTS,
  SET_PATIENT_TEST_RESULTS,
  SET_NURSE_TEST_RESULTS,
} from '../actions/testResults';

const initialState: ITestResultsReducer = {
  nurseTestResults: [],
  patientTestResults: [],
  isLoading: false,
};

const testResults = (
  state = initialState,
  action: IAction,
): ITestResultsReducer => {
  switch (action.type) {
    case SET_PATIENT_TEST_RESULTS:
      return {...state, patientTestResults: action.payload};
    case SET_NURSE_TEST_RESULTS:
      return {...state, nurseTestResults: action.payload};
    case SET_IS_LOADING_TEST_RESULTS:
      return {...state, isLoading: action.payload};
    case RESET_TEST_RESULTS:
      return initialState;
    default:
      return state;
  }
};

export default testResults;
