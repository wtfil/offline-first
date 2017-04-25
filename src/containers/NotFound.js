import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound() {
  return <div className='center-align'>
    <h1>404 Nothing Found</h1>
    <h5>
      <Link to='/'>Back to site</Link>
    </h5>
  </div>
}
