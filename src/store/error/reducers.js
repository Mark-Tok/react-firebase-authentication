import {
    GET_INFO_ERROR,
} from './actions'

const defaultState = [{
    phone: null,
    reason: null,
    date: null,
    status: false
}]
export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_INFO_ERROR:
            return [
                ...state,
                action.payload
            ]
        default: return state; 
    }
}