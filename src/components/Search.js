import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import debounce from 'debounce';

import Loader from './Loader';

export default class Search extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value || ''
    }
    this.onSearch = debounce(props.onSearch, 500);
  }

  onChange(e) {
    const {value} = e.target;
    this.setState({value});
    if (value) {
      this.onSearch(value);
    }
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
      {value &&
      	(currentResults ?
      	  (currentResults.length ?
      	    <ul className='collection'>
      	      {currentResults.map(item =>
      	      	<li key={item.full_name} className='collection-item'>
      	      	  <Link
      	      	    to={'/' + item.full_name}
		            children={item.full_name}
      	      	  />
      	      	</li>
      	      )}
      	    </ul> :
      	    null
      	  ) :
      	  <Loader/>
      	)
      }
    </div>
  }
}
