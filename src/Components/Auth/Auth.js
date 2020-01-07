import React from 'react';
import authRequests from '../../Helpers/Validation/Validation';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const { user } = this.state;
    authRequests.loginUser(user)
      .then(() => { this.props.history.push('/home'); })
      .catch((error) => { console.error('problem with login'); });
  }

  render() {
    return (
        <div className="Auth">
          <button className="btn btn-danger" onClick={this.loginClickEvent}>Login</button>
        </div>
    );
  }
}

export default Auth;
