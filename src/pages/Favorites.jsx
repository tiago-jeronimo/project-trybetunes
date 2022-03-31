import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <p>This is Favorites</p>
        <Header />
      </div>
    );
  }
}

export default Favorites;
