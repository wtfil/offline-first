import React, {Component} from 'react';
import {connect} from 'react-redux';

import {searchTop} from '../actions';

@connect(state => state)
export default class Search extends Component {
  componentWillMount() {
    this.props.dispatch(searchTop('js'));
  }
  render() {
    const {search} = this.props;
    console.log(search);
    return <div>
      search
    </div>
  }
}
