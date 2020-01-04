import React from 'react';
import moment from 'moment';

import './UserProfile.scss';

const UserProfile = (props) => {
  const {
    firstName,
    lastName,
    dateCreated,
    phone,
    email,
  } = props.customerInfo;
  // eslint-disable-next-line global-require
  const defaultUserImg = require('../../Assets/default-user-image.png');
  return (
    <div className="UserProfile">
      <img className="mb-2" alt="default user" src={defaultUserImg} height="300" />
      <p>Date Joined: {moment({ dateCreated }).format('MMMM Do, YYYY')}</p>
      <div className="profile-info container">
        <div className="profile-info-left col-6">
          <h2>Account Information</h2>
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
        <div className="profile-info-right col-6">
          <div className="profile-button">
            <button className="btn btn-outline-primary">
              <h2>Your Orders</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserProfile;
