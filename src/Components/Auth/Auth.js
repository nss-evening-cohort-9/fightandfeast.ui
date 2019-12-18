import React from 'react';
import { Link } from 'react-router-dom';
import authRequests from '../../Helpers/Validation/Validation';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests.loginUser(user)
      .then(() => { this.props.history.push('/products'); })
      .catch((error) => { console.error('problem with login'); });
  }

  render() {
    return (
        <div className="Auth">
          <button className="btn btn-danger" onClick={this.loginClickEvent}>Login with Google</button>
        </div>
    );
  }
}

export default Auth;
