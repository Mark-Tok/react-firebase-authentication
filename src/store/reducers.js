import {combineReducers} from 'redux';
import successReducer from './success/reducers'
import errorReducer from './error/reducers'
import statusReducer from './session/reducers'
import fetchReducer from './fetch/reducers'
import fetchUrlReducer from './fetchUrl/reducers'

const rootRedecer = combineReducers({
    success: successReducer,
    error: errorReducer,
    status:statusReducer,
    fetch:fetchReducer,
    fetchUrl:fetchUrlReducer
}) 

export default rootRedecer;