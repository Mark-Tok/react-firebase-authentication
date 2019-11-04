import { RECEIVE_API_DATA } from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_API_DATA:
      return {timezone: action.data};
    default:
      return state;
  }
};