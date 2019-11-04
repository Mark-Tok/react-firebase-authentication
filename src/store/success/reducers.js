import {
    GET_INFO,
} from './actions'

const defaultState = [{
    phone: null,
    code: null,
    date: null,
    status: false
}]
export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_INFO:
            return [
                ...state,
                action.payload
            ]
        case 'INCREMENT':
            return [
                ...state,
                action.payload
            ]
        default: return state;        
    }
}