import React, { Component } from 'react';
import syms from '../components/tickers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchStock } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      errorMessage: ''
    };

    this.validateSearch = this.validateSearch.bind(this);
  }
  validateSearch(event) {
    //checks the current term stored in state and verifies if it matches a valid stock symbol. If so, makes an ajax request via axios. Otherwise displays a message to the user indicating that the search is invalid.
    event.preventDefault();
    console.log(
      this.state.term,
      syms().includes(this.state.term.toUpperCase())
    );
    if (!syms().includes(this.state.term.toUpperCase())) {
      this.setState({
        errorMessage: 'Invalid Symbol',
        term: ''
      });
      return;
    }
    this.setState({
      errorMessage: '',
      term: ''
    });
    this.props.SearchStock(this.state.term.toUpperCase());
    this.props.callback();
  }
  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <form onSubmit={this.validateSearch} className="input-group">
          <input
            placeholder="Search stock symbols"
            value={this.state.term}
            onChange={event => {
              this.setState({ term: event.target.value });
            }}
            className="form-control"
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-success">
              Search
            </button>
          </span>
        </form>
        <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ SearchStock }, dispatch);
}
export default connect(null, mapDispatchToProps)(SearchBar);
