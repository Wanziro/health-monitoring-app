import {IAction, TestJourneyReducer} from '../../interfaces';
import {
  RESET_TEST_JOURNEY,
  SET_TEST_JOURNEY_SELECTED_PATIENT,
  SET_TEST_JOURNEY_TYPE,
} from '../actions/testJourneyData';

const initialState: TestJourneyReducer = {
  selectedPatient: undefined,
  testType: undefined,
};

const testJourney = (
  state = initialState,
  action: IAction,
): TestJourneyReducer => {
  switch (action.type) {
    case SET_TEST_JOURNEY_SELECTED_PATIENT:
      return {...state, selectedPatient: action.payload};
    case SET_TEST_JOURNEY_TYPE:
      return {...state, testType: action.payload};
    case RESET_TEST_JOURNEY:
      return initialState;
    default:
      return state;
  }
};

export default testJourney;
