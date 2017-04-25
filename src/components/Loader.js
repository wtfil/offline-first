import React from 'react';

export default function Loader() {
  return <div className='center-align large-margin-top'>
    <div className='preloader-wrapper big active'>
      <div className='spinner-layer spinner-blue-only'>
        <div className='circle-clipper left'>
          <div className='circle'></div>
        </div>
      </div>
    </div>
  </div>
}
