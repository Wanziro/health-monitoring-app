import {combineReducers} from 'redux';
import user from './user';
import departments from './departments';
import beds from './beds';
import testResults from './testResults';
const rootReducer = combineReducers({
  user,
  beds,
  departments,
  testResults,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
