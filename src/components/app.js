import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import StockDetails from '../containers/stock_details';
import StockList from '../containers/stock_list';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockDetails: <div />,
      someNumber: 0
    };
    this.forceRerender = this.forceRerender.bind(this);
  }
  forceRerender() {
    const someNumber = Math.random(); //force a re-render of stocklist
    const stockDetails = <StockDetails callback={this.forceRerender} />;
    this.setState({ someNumber, stockDetails });
  }
  render() {
    const stockDetails = <StockDetails callback={this.forceRerender} />;
    return (
      <div style={{ maxWidth: '700px', margin: 'auto' }}>
        <SearchBar
          callback={() => {
            this.setState({ stockDetails });
          }}
        />
        {this.state.stockDetails}
        <StockList
          someNumber={this.state.someNumber}
          callback={this.forceRerender}
        />
      </div>
    );
  }
}
