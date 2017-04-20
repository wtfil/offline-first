import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

@connect(state => state)
export default class Layout extends Component {
  render() {
    const {onlineStatus, children} = this.props;
    return <div>
      <Header
        onlineStatus={onlineStatus}
      />
      <div className='container'>
      	{children}
      </div>
    </div>
  }
}

function Header({onlineStatus}) {
  return <nav>
    <div className='nav-wrapper'>
      <ul className='left'>
        <li><Link to='/'>Search</Link></li>
        {!onlineStatus.isOnline &&
          <li>
            <i className='material-icons' children='sync_problem'/>
          </li>
        }
      </ul>
    </div>
  </nav>
}
