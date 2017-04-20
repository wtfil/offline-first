import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getRepository} from '../actions';

@connect(state => state)
export default class RepositoryPage extends Component {
  componentWillMount() {
    const {dispatch, match: {params}} = this.props;
    dispatch(getRepository(params));
  }
  render() {
    const {repositories, match: {params}} = this.props;
    const fullName = params.user + '/' + params.repo;
    const repository = repositories.find(item => item.full_name === fullName);

    if (!repository) {
      return null
    }
    return <Repository
      repository={repository}
    />
  }
}

function Repository({repository}) {
  console.log(repository);
  return <div>
    <h4>{repository.full_name}</h4>
    <h6>{repository.description}</h6>
    <div>
      <i className='material-icons' children='star'/>
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
