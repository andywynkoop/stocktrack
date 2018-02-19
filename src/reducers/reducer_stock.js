import { SEARCH_STOCK, VIEW_STOCK } from '../actions/index';

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_STOCK:
      return action.payload.data;
    case VIEW_STOCK:
      return action.payload;
    default:
      return state;
  }
};
