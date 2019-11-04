import {GET_GEO } from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
      case GET_GEO:
      return {action: action.url};
    default:
      return state;
  }
};
