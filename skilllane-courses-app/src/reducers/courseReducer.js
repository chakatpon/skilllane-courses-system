import _ from 'lodash';

import {
    CREATE_COURSE,
    FETCH_COURSES,
    FETCH_COURSE,
    DELETE_COURSE,
    EDIT_COURSE
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_COURSES:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_COURSE:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_COURSE:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_COURSE:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_COURSE:
            return _.omit(state, action.payload)
        default:
            return state;
        
    }
}