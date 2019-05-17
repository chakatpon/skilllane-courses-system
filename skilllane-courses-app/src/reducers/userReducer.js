import { SET_USER } from '../actions/types'

const INITIAL_STATE = {
    username: '',
    isIns: false,
    firstname:'',
    lastname:'',
    nickname:''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_USER:
            return {...action.payload}
        default:
            return state
    }
}