import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Layout extends Component {
  render() {
    const {children} = this.props;
    return <div>
      <Header/>
      <div className='container'>
      	{children}
      </div>
    </div>
  }
}

function Header() {
  return <nav>
    <div className='nav-wrapper'>
      <ul className='left'>
        <li><Link to='/'>Search</Link></li>
      </ul>
    </div>
  </nav>
}
