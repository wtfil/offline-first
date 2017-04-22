import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

import {getStars, getRepository} from '../actions';

@connect(state => state)
export default class RepositoryPage extends Component {
  componentWillMount() {
    const {dispatch, match: {params}} = this.props;
    dispatch(getRepository(params));
    dispatch(getStars());
  }
  render() {
    const {repositories, stars, match: {params}} = this.props;
    const fullName = params.user + '/' + params.repo;
    const repository = repositories.find(item => item.full_name === fullName);

    if (!repository) {
      return null
    }
    return <Repository
      repository={repository}
      stars={stars}
      onToggleStar={() => {}}
    />
  }
}

function Repository({repository, stars, onToggleStar}) {
  const hasStar = stars.includes(repository.full_name);
  return <div>
    <h4>{repository.full_name}</h4>
    <h6>{repository.description}</h6>
    <div>
      <i
        onClick={onToggleStar}
        className={cx('material-icons', {'amber-text': hasStar})}
        children='star'
      />
      <span>
      	{repository.stargazers_count}
      </span>
    </div>
    <div>
      <i className='material-icons' children='visibility'/>
      {repository.subscribers_count}
    </div>
    <div>
      <i className='material-icons' children='call_split'/>
      {repository.forks}
    </div>
  </div>
}
