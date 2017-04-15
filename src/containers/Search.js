import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect(state => state)
export default class Search extends Component {
  render() {
    return <div>
      search
    </div>
  }
}
