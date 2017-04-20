import React, {Component} from 'react';
import {connect} from 'react-redux';
import debounce from 'debounce';

import {searchTop} from '../actions';

@connect(state => state)
export default class SearchPage extends Component {
  render() {
    const {dispatch, searchResults} = this.props;
    return <Search
      searchResults={searchResults}
      onSearch={value => dispatch(searchTop(value))}
    />
  }
}

class Search extends Component {
  state = {
    value: ''
  }

  constructor(props) {
    super();
    this.onSearch = debounce(props.onSearch, 500);
  }

  onChange(e) {
    const {value} = e.target;
    this.setState({value});
    this.onSearch(value);
  }

  componentWillMount() {
    this.onChange({target: {value: 'js'}});
  }

  render() {
    const {searchResults} = this.props;
    const {value} = this.state;
    const currentResults = searchResults[value];

    return <div className='container'>
      <form>
      	<input
      	  value={value}
	  onChange={::this.onChange}
      	  placeholder='search'
      	/>
      </form>
      {currentResults &&
      	<ul className='collection'>
      	  {currentResults.map(item =>
      	    <li key={item.full_name} className='collection-item'>{item.full_name}</li>
      	  )}
      	</ul>
      }
    </div>
  }
}
