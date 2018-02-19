import axios from 'axios';
const API_KEY = '6HTYZK7G7MQDNXLA';
const ROOT_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&apikey=${API_KEY}`;

export function loadStockList(symbol, callback) {
  axios.get(`${ROOT_URL}&symbol=${symbol}`).then(res => callback(res));
}
