import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import styles from './Search.module.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      btnInactive: true,
      loading: false,
      response: [],
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validationInput = this.validationInput.bind(this);
    this.searchInAPI = this.searchInAPI.bind(this);
    this.messageScreen = this.messageScreen.bind(this);
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

  async searchInAPI(p) {
    p.preventDefault();
    const { value } = this.state;
    this.setState({
      loading: true,
    });
    const responseAPI = await searchAlbumsAPI(value);
    this.setState({
      loading: false,
      response: responseAPI,
    }, () => this.messageScreen());
  }

  messageScreen() {
    const { response, value } = this.state;
    if (response.length < 1) {
      this.setState({
        message: 'Nenhum álbum foi encontrado',
      });
    } else {
      this.setState({
        message: `Resultado de álbuns de: ${value}`,
        value: '',
      });
    }
  }

  render() {
    const { btnInactive, value, loading, response, message } = this.state;
    return (
      <div>
        <Header />
        { loading ? (
          <Loading loading={ loading } />
        ) : (
          <div data-testid="page-search">
            <h1>Search</h1>
            <div className={ styles.inputAndBtn }>
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
                onClick={ (p) => this.searchInAPI(p) }
              >
                Pesquisar
              </button>
            </div>
            <h2>{message}</h2>
            {response.map((p) => (
              <Link
                data-testid={ `link-to-album-${p.collectionId}` }
                to={ `/album/${p.collectionId}` }
                key={ p.collectionId }
              >
                <section className={ styles.container }>
                  <div className={ styles.block }>
                    <img src={ p.artworkUrl100 } alt={ p.collectionId } />
                    <h3>{ p.collectionName }</h3>
                    <h4>{ p.artistName }</h4>
                  </div>
                </section>
              </Link>
            ))}

          </div>)}
      </div>
    );
  }
}
export default Search;
