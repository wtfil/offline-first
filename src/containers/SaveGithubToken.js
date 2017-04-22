import React, {Component} from 'react';
import {connect} from 'react-redux';
import qs from 'querystring';

import {setAuthToken, getUser} from '../actions';

@connect(state => state)
export default class SaveGithubToken extends Component {
  componentWillMount() {
    const {history, location: {search}, dispatch} = this.props;
    const query = qs.parse(search.slice(1));
    dispatch(setAuthToken(query.token));
    dispatch(getUser());
    history.replace('/');
  }
  render() {
    return null;
  }
}
