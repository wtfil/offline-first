import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {logout, getAuthFromStorage} from '../actions';

@connect(state => state)
export default class Layout extends Component {
  componentWillMount() {
    this.props.dispatch(getAuthFromStorage());
  }
  render() {
    const {dispatch, onlineStatus, auth, children} = this.props;
    return <div>
      <Header
        onlineStatus={onlineStatus}
        auth={auth}
        onLogout={() => dispatch(logout())}
      />
      <div className='container'>
      	{children}
      </div>
    </div>
  }
}

class Header extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.onLogout();
  }
  render() {
    const {onlineStatus, auth} = this.props;

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
        <ul className='right'>
          <li>
            {auth.token ?
                <a onClick={::this.onLogout} children='Logout'/> :
                <a href='/login' children='Login'/>
            }
          </li>
        </ul>
      </div>
    </nav>
  }
}
