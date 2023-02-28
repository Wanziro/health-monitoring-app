import {combineReducers} from 'redux';
import user from './user';
import departments from './departments';
import beds from './beds';
const rootReducer = combineReducers({
  user,
  beds,
  departments,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
