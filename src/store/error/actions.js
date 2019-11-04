export const GET_INFO_ERROR = 'GET_INFO_ERROR';


export const getErrorInfo = (value) => {
    return {
        type: GET_INFO_ERROR,
        payload: value
    }
}