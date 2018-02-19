import { ADD_STOCK, DELETE_STOCK } from '../actions';

export default (state = {}, action) => {
  const newState = state;
  switch (action.type) {
    case ADD_STOCK:
      const sym = action.payload['Meta Data']['2. Symbol'];
      newState[sym] = action.payload;
      return newState;
    case DELETE_STOCK:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};
