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
    console.log(currentResults);

    return <div className='container'>
      <form>
      	<input
      	  value={value}
	  onChange={::this.onChange}
      	  placeholder='search'
      	/>
      </form>
      {currentResults &&
      	<div>
      	  {currentResults.map(item =>
      	    <div key={item.full_name} className='card'>
      	      <div className='card-content'>
      	      	<span className='card-title'>{item.full_name}</span>
      	      	<p>yo</p>
      	      </div>
      	      <div className='card-action'>
      	      	<button className='waves-effect waves-light btn'>
      	      	  <i className='material-icons left' children='cloud'/>
		  button
		</button>
      	      </div>
      	    </div>
      	  )}
      	</div>
      }
    </div>
  }
}
