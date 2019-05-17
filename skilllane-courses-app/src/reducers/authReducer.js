import { LOG_IN, LOG_OUT, SET_DATA } from '../actions/types';

const INITIAL_STATE = {
    isLogedIn: false,
    username: '',
    password: '',
    role: 'student',
    submitted: false,
    loading: false,
    error: ''
    
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return {...state, isLogedIn: true}
        case LOG_OUT:
            return {...state, isLogedIn: false}
        case SET_DATA:
            return {...state, ...action.payload }
        default: 
            return state;
    }
}