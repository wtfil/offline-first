import React, {Component} from 'react';
import {connect} from 'react-redux';

import Repository from '../components/Repository';
import {getStars, toggleStar, getRepository} from '../actions';

@connect(state => state)
export default class RepositoryPage extends Component {
  async componentWillMount() {
    const {dispatch, match: {params}} = this.props;
    await dispatch(getStars());
    dispatch(getRepository(params));
  }
  render() {
    const {dispatch, repositories, stars, match: {params}} = this.props;
    const fullName = params.user + '/' + params.repo;
    const repository = repositories.find(item => item.full_name === fullName);

    if (!repository) {
      return null
    }
    return <Repository
      repository={repository}
      stars={stars}
      onToggleStar={() => dispatch(toggleStar(fullName))}
    />
  }
}

