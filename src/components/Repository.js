import React from 'react'
import cx from 'classnames';

export default function Repository({repository, hasStar, readme, onToggleStar}) {
  return <div className='repository'>
    <div className='repository__head'>
      <div className='repository__title'>
        <h4>{repository.full_name}</h4>
        <h6>{repository.description}</h6>
      </div>
      <div className='repository__chips'>
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
    </div>
    <p
      className='card-panel repository__readme'
      dangerouslySetInnerHTML={{
        __html: readme
      }}
    />
  </div>
}
