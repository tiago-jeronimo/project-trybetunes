import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h2>This is Profile</h2>
      </div>
    );
  }
}

export default Profile;
