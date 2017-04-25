import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  getStars,
  toggleStar,
  getRepository,
  getReadme
} from 'actions';
import Repository from 'components/Repository';
import Loader from 'components/Loader';

@connect(state => state)
export default class RepositoryPage extends Component {
  getFullName() {
    const {match: {params}} = this.props;
    return params.user + '/' + params.repo;
  }
  async componentWillMount() {
    const {dispatch} = this.props;
    const fullName = this.getFullName();
    await dispatch(getStars());
    dispatch(getReadme(fullName));
    dispatch(getRepository(fullName));
  }
  render() {
    const {dispatch, repositories, stars, readmes} = this.props;
    const fullName = this.getFullName();
    const repository = repositories.find(item => item.full_name === fullName);
    const readme = readmes[fullName];

    if (!repository) {
      return <Loader/>
    }
    return <Repository
      repository={repository}
      readme={readme}
      hasStar={stars.includes(fullName)}
      onToggleStar={() => dispatch(toggleStar(fullName))}
    />
  }
}

