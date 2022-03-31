import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <p>This is Search</p>
        <Header />
      </div>
    );
  }
}

export default Search;
