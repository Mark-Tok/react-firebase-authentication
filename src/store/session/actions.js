export const SET_STATUS_TRUE = 'SET_STATUS_TRUE';
export const SET_STATUS_FALSE = 'SET_STATUS_FALSE';

export const setStatusTrue = (value) => {
    return {
        type: SET_STATUS_TRUE,
        payload: value
    }
}
export const setStatusFalse = (value) => {
    return {
        type: SET_STATUS_FALSE,
        payload: value
    }
}