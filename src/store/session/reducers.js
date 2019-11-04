import {
    SET_STATUS_TRUE,
    SET_STATUS_FALSE
} from './actions'

const defaultState = [{
    status: false,
}]
export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_STATUS_TRUE:
            return [
                ...state,
                action.payload
            ]
        case SET_STATUS_FALSE:
            return [
                ...state,
                action.payload
            ]
        default: return state;
    }
}