import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <p>This is Album</p>
        <Header />
      </div>
    );
  }
}

export default Album;
