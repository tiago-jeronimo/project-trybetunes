import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
      </div>
    );
  }
}

export default Search;
