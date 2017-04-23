import React, {Component} from 'react';
import {connect} from 'react-redux';
import qs from 'querystring';

import {searchTop} from '../actions';
import Search from '../components/Search';

@connect(state => state)
export default class SearchPage extends Component {
  constructor(props) {
    super();
    const query = qs.parse(props.location.search.slice(1));
    this.state = {
      value: query.q || ''
    }
  }
  onSearch(value) {
    const {dispatch, history, location} = this.props;
    const url = location.pathname + '?q=' + value;
    history.replace(url);
    dispatch(searchTop(value));
  }
  componentWillMount() {
    if (this.state.value) {
      this.props.dispatch(searchTop(this.state.value));
    }
  }

  render() {
    const {dispatch, searchResults} = this.props;
    const {value} = this.state;
    return <Search
      value={value}
      searchResults={searchResults}
      onSearch={::this.onSearch}
    />
  }
}
