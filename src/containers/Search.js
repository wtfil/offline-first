import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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

  render() {
    const {searchResults} = this.props;
    const {value} = this.state;
    const currentResults = searchResults[value];

    return <div>
      <form onSubmit={e => e.preventDefault()}>
      	<input
      	  value={value}
	  onChange={::this.onChange}
      	  placeholder='search'
      	  autoFocus
      	/>
      </form>
      {currentResults &&
      	<ul className='collection'>
      	  {currentResults.map(item =>
      	    <li key={item.full_name} className='collection-item'>
      	      <Link
      	      	to={'/' + item.full_name}
		children={item.full_name}
      	      />
      	    </li>
      	  )}
      	</ul>
      }
    </div>
  }
}
