import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form'
import authReducer from './authreducer';
import courseReducer from './courseReducer';
import userReducer from './userReducer';

export default combineReducers({
    auth: authReducer,
    courses: courseReducer,
    user: userReducer,
    form: formReducer
})