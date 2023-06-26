import { combineReducers } from 'redux';
import authReducer from './auth/authSlice';
import dogsReducer from './dogs/dogsSlice'
// Import other reducers

const rootReducer = combineReducers({
  auth: authReducer,
  dogs: dogsReducer
  // Other reducers
});

export default rootReducer;
