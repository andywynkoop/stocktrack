import { combineReducers } from 'redux';
import StockReducer from './reducer_stock';
import StockListReducer from './reducer_stock_list';

const rootReducer = combineReducers({
  stock: StockReducer,
  stockList: StockListReducer
});

export default rootReducer;
