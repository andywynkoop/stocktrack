import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToList } from '../actions';
import { loadStockList } from '../actions/loadStockList';
import StockListItem from './stock_list_item';

class StockList extends Component {
  componentDidMount() {
    const myStocks = JSON.parse(localStorage.getItem('myStocks'));
    if (myStocks) {
      myStocks.forEach(stock => {
        loadStockList(stock, res => {
          this.props.addToList(res.data);
          this.props.callback();
        });
      });
    }
  }
  renderMyList() {
    const stocks = this.props.stockList;
    let stockList = Object.keys(stocks).map(symbol => {
      return (
        <StockListItem
          symbol={symbol}
          stock={stocks[symbol]}
          key={symbol}
          callback={this.props.callback}
        />
      );
    });
    return stockList;
  }
  render() {
    return <ul className="list-group stock-list">{this.renderMyList()}</ul>;
  }
}

function mapStateToProps({ stockList }) {
  return { stockList };
}

export default connect(mapStateToProps, { addToList })(StockList);
