import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      btnInactive: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validationInput = this.validationInput.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validationInput());
  }

  validationInput() {
    const { value } = this.state;
    const numberhabilitation = 2;
    if (value.length >= numberhabilitation) {
      this.setState({ btnInactive: false });
    } else {
      this.setState({ btnInactive: true });
    }
  }

  render() {
    const { btnInactive, value } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <input
          data-testid="search-artist-input"
          type="text"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <button
          disabled={ btnInactive }
          data-testid="search-artist-button"
          type="submit"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
