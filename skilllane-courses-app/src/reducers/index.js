import { combineReducers } from 'redux';
import authReducer from './authreducer';
import courseRecucer from './courseReducer';

export default combineReducers({
    auth: authReducer,
    courses: courseRecucer 
})