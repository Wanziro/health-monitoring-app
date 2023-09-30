import {combineReducers} from 'redux';
import user from './user';
import departments from './departments';
import beds from './beds';
import testResults from './testResults';
import testJourneyData from './testJourneyData';
const rootReducer = combineReducers({
  user,
  beds,
  departments,
  testResults,
  testJourneyData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
