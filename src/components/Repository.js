import React from 'react'
import cx from 'classnames';

export default function Repository({repository, stars, onToggleStar}) {
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
