export const GET_INFO = 'GET_INFO';

export const getSuccessInfo = (value) => {
    return {
        type: GET_INFO,
        payload: value
    }
}