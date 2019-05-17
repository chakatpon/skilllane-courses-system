import courses from '../apis/courses';
import history from '../history';
import {
    LOG_IN,
    LOG_OUT,
    SET_DATA,
    SET_USER,
    USER_NAME,
    PASSWORD,
    ROLE,
    CREATE_COURSE,
    FETCH_COURSES,
    FETCH_COURSE,
    DELETE_COURSE,
    EDIT_COURSE
    
} from './types'


export const setData = (value) => {
    return {
        type: SET_DATA,
        payload: value
    }
}

export const setUser = (value) => {
    return {
        type: SET_USER,
        payload: value
    }
}

export const setUserName = (value) => {
    return {
        type: USER_NAME,
        payload: value
    }
}

export const setPassword = (event) => {
    return {
        type: PASSWORD,
        payload: {}
    }
}

export const setRole = (event) => {
    return {
        type: ROLE,
        payload: {}
    }
}

export const logIn = (data) => {
    return {
        type: LOG_IN,
        payload: {}
    }
}

export const createCourse = (params) => async (dispatch) => {
    const response = await courses.post('/courses', params)

    dispatch({ type: CREATE_COURSE, payload: response.data })
    history.push('/');
}

export const fetchCourses = () => async (dispatch) => {
    const response = await courses.get('/courses');
    
    dispatch({ type: FETCH_COURSES, payload: response.data});
    history.push('/');
}

export const fetchCourse = (id) => async (dispatch) => {
    const response = await courses.get(`/courses/${id}`);

    dispatch({ type: FETCH_COURSE, payload: response.data})
}

export const deleteCourse = (id) => async (dispatch) => {
    await courses.delete(`/courses/${id}`);

    dispatch({ type: DELETE_COURSE, payload: id})
    history.push('/');
}

export const editCourse = (id, params) => async (dispatch) => {
    const response = await courses.patch(`/courses/${id}`, params);

    dispatch({ type: EDIT_COURSE, payload: response.data})
    history.push('/');
}