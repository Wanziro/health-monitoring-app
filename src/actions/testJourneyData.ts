import {TEST_TYPES_ENUM} from '../../interfaces';

import {IPatient} from '../interfaces';

export const SET_TEST_JOURNEY_SELECTED_PATIENT =
  'SET_TEST_JOURNEY_SELECTED_PATIENT';
export const SET_TEST_JOURNEY_TYPE = 'SET_TEST_JOURNEY_TYPE';
export const RESET_TEST_JOURNEY = 'RESET_TEST_JOURNEY';

interface IAction {
  type: string;
  payload: any;
}
export const setTestJourneySelectedPatient = (patient: IPatient): IAction => ({
  type: SET_TEST_JOURNEY_SELECTED_PATIENT,
  payload: patient,
});

export const setTestJourneyType = (value: TEST_TYPES_ENUM): IAction => ({
  type: SET_TEST_JOURNEY_TYPE,
  payload: value,
});

export const resetTestJourney = () => ({type: RESET_TEST_JOURNEY});
