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
            return {...state, courses: [...action.payload]};
        case FETCH_COURSE:
            return {...state, courses: [...state.courses, ..._.mapKeys(action.payload)]};
        case CREATE_COURSE:
            console.log("create cortse", {...state, courses: [...state.courses, action.payload]} )
            return {...state, courses: [...state.courses, action.payload]};
        case EDIT_COURSE:
            return {...state, courses: [...state.courses, ..._.mapKeys(action.payload)]};
        case DELETE_COURSE:
            {
                console.log("action payload",action.payload)
                const courses = state.courses.filter( course => {
                      return course.id != action.payload;
                })
                console.log("delete course : ",{...state, courses: courses})
                return {...state, courses: courses};
            }
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