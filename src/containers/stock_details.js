import React, { Component } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { connect } from 'react-redux';
import _ from 'lodash';
import { addToList } from '../actions';

class StockDetails extends Component {
  addToLocalStorage(symbol) {
    var myStocks = JSON.parse(localStorage.getItem('myStocks'));
    if (!myStocks) {
      myStocks = [];
    }
    if (!myStocks.includes(symbol)) {
      myStocks.push(symbol);
    }
    localStorage.setItem('myStocks', JSON.stringify(myStocks));
  }
  renderStockData() {
    const data = this.props.data;
    if (!data || _.isEmpty(data)) {
      return <h4>Retrieving stock data...</h4>;
    }
    const priceData = data['Time Series (1min)'];
    let prices = Object.keys(priceData).map(key => {
      return priceData[key]['1. open'];
    });
    let start = prices[0];
    let end = prices[prices.length - 1];
    let d = Math.round((end - start) * 100) / 100;
    let percentD = Math.round((end - start) / end * 1000) / 1000;
    const color = end >= start ? 'green' : 'red';
    const style = { color };
    const direction =
      end >= start
        ? 'glyphicon glyphicon-arrow-up'
        : 'glyphicon glyphicon-arrow-down';
    const date = new Date();
    const day = date.getDate();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const month = months[date.getMonth()];
    const latest = data['Meta Data']['3. Last Refreshed'].split(' ');
    const dateItems = latest[0].split('-');
    let newTime = latest[1].split(':');
    newTime = newTime[0] + ':' + newTime[1];
    const lastUpdateMesssage = `Last Updated ${dateItems[2]} ${
      months[parseInt(dateItems[1], 10) - 1]
    } ${dateItems[0]} at ${newTime} EST`;
    return (
      <div>
        <h4>
          Price data for {day} {month}
        </h4>

        <Sparklines height={200} width={400} data={prices}>
          <SparklinesLine color="#00dddd" />
        </Sparklines>

        <h3>
          <span style={{ color: 'blue' }}>
            {data['Meta Data']['2. Symbol']}
            <span style={style}>
              <span className={direction} />
              $ {d} (% {percentD})
            </span>{' '}
          </span>
        </h3>
        <p style={{ color: 'green' }}>
          {' '}
          High: ${_.max(prices)}{' '}
          <span style={{ color: 'red' }}> Low: ${_.min(prices)}</span>
        </p>
        <p> {lastUpdateMesssage} </p>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <button
            className="btn btn-info"
            style={{ width: '60%', marginBottom: '20px' }}
            onClick={() => {
              this.props.addToList(data);
              this.props.callback(); //need to rerender to show updated list
              this.addToLocalStorage(data['Meta Data']['2. Symbol']);
            }}
          >
            Watch this stock
          </button>
        </div>
      </div>
    );
  }
  render() {
    return <div>{this.renderStockData()}</div>;
  }
}

function mapStateToProps({ stock }) {
  return { data: stock };
}

export default connect(mapStateToProps, { addToList })(StockDetails);
