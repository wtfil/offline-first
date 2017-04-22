import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

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

function Repository({repository, stars, onToggleStar}) {
  const hasStar = stars.includes(repository.full_name);
  return <div>
    <h4>{repository.full_name}</h4>
    <h6>{repository.description}</h6>
    <div className='chip' onClick={onToggleStar}>
      <i
        className={cx('close material-icons', {'amber-text': hasStar})}
        children='star'
      />
      {repository.stargazers_count}
    </div>
    <div className='chip'>
      <i className='close material-icons' children='visibility'/>
      {repository.subscribers_count}
    </div>
    <div className='chip'>
      <i className='close material-icons' children='call_split'/>
      {repository.forks}
    </div>
  </div>
}
