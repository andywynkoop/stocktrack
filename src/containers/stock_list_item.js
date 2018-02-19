import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ViewStock, deleteFromList } from '../actions';
import { Sparklines, SparklinesLine } from 'react-sparklines';

class StockListItem extends Component {
  showDetails() {
    this.props.ViewStock(this.props.stock);
    this.props.callback();
  }
  removeStock() {
    let myStocks = JSON.parse(localStorage.getItem('myStocks'));
    localStorage.setItem(
      'myStocks',
      JSON.stringify(
        myStocks.filter(stock => {
          return stock !== this.props.symbol;
        })
      )
    );
    this.props.deleteFromList(this.props.symbol);
    this.props.callback();
  }
  render() {
    const { stock, symbol } = this.props;
    const priceData = stock['Time Series (1min)'];
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
    return (
      <li className="list-group-item" key={symbol}>
        <button
          className="btn btn-danger pull-right"
          onClick={this.removeStock.bind(this)}
          style={{ padding: '3px 8px' }}
        >
          X
        </button>
        <div onClick={this.showDetails.bind(this)}>
          <h5>
            <span style={{ color: 'blue' }}>
              {symbol}
              <span style={style}>
                <span className={direction} />
                $ {d} (% {percentD})
              </span>{' '}
            </span>
          </h5>
          <Sparklines height={80} width={300} data={prices}>
            <SparklinesLine color="#00dddd" />
          </Sparklines>
        </div>
      </li>
    );
  }
}
export default connect(null, { ViewStock, deleteFromList })(StockListItem);
