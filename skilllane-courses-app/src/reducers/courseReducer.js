import _ from 'lodash';

import {
    CREATE_COURSE,
    FETCH_COURSES,
    FETCH_COURSE,
    DELETE_COURSE,
    EDIT_COURSE,
    SEARCH_COURSE,
    INIT_COURSE
} from '../actions/types'

const INITIAL_STATE = {
    value:  '',
    courses: [],
    filteredCourses: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COURSES:
            console.log("state : ",{...state, courses: [...action.payload]})
            return {...state, courses: [...action.payload]};
        case FETCH_COURSE:
            return {...state, courses: [...{...state.courses, [action.payload.id]: action.payload}]};
        case CREATE_COURSE:
            return {...state, courses: {...state.courses, [action.payload.id]: action.payload}};
        case EDIT_COURSE:
            return {...state, courses: {...state.courses, [action.payload.id]: action.payload}};
        case DELETE_COURSE:
            return {...state, courses: _.omit(state.courses, action.payload)};
        case SEARCH_COURSE:
                {
                    const value = action.payload;
                    const filteredCourses = state.courses.filter((element => {
                        return element.title.toLowerCase().includes(value.toLowerCase());
                      }));
                    return {...state, value, filteredCourses};
                }
        case INIT_COURSE:
            return action.payload
        default:
            return state;
        
    }
}