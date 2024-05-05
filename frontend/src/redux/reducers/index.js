import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import authReducer from './authreducer';

const rootReducer = combineReducers({
  courses: courseReducer,
  auth: authReducer
});


export default rootReducer;
