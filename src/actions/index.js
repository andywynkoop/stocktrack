import axios from 'axios';

const API_KEY = '6HTYZK7G7MQDNXLA';
const ROOT_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&apikey=${API_KEY}`;

export const SEARCH_STOCK = 'SEARCH_STOCK';
export const VIEW_STOCK = 'VIEW_STOCK';
export const ADD_STOCK = 'ADD_STOCK';
export const DELETE_STOCK = 'DELETE_STOCK';

export function SearchStock(sym) {
  const url = `${ROOT_URL}&symbol=${sym}`;
  const request = axios.get(url);
  return {
    type: SEARCH_STOCK,
    payload: request
  };
}

export function ViewStock(data) {
  console.log(data);
  return {
    type: VIEW_STOCK,
    payload: data
  };
}
export function addToList(data) {
  return {
    type: ADD_STOCK,
    payload: data
  };
}

export function deleteFromList(symbol) {
  return {
    type: DELETE_STOCK,
    payload: symbol
  };
}
