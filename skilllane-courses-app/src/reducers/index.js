import { combineReducers } from 'redux';
import authReducer from './authreducer';
import courseReducer from './courseReducer';
import userReducer from './userReducer';

export default combineReducers({
    auth: authReducer,
    courses: courseReducer,
    user: userReducer
})