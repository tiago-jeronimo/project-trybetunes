import React from 'react';
import PropTypes from 'prop-types';
import styles from './MusicCard.module.css';
import Loading from '../pages/Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      check: false,
      favoritesMusics: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.functionFavorites = this.functionFavorites.bind(this);
    this.functionRemoveFavorites = this.functionRemoveFavorites.bind(this);
    this.getFavoriteSongs = this.FavoriteSongs.bind(this);
    // this.funcRemove = this.funcRemove.bind(this);
  }

  componentDidMount() {
    this.FavoriteSongs();
  }

  handleChange({ target }) {
    const { infoAlbum } = this.props;
    const { checked } = target;
    return (checked) ? this.functionFavorites(infoAlbum)
      : this.functionRemoveFavorites(infoAlbum);
  }

  async FavoriteSongs() {
    this.setState({
      loading: true,
    });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, favoritesMusics: favorites });
    const { favoritesMusics } = this.state;
    const { infoAlbum } = this.props;
    const results = favoritesMusics.find((element) => (
      element.trackName.includes(infoAlbum.trackName)
    ));
    if (results) {
      this.setState({
        check: true,
      });
    }
  }

  async functionFavorites(param) {
    this.setState({
      loading: true,
    });
    await addSong(param);
    this.setState({
      loading: false,
      check: true,
    });
  }

  async functionRemoveFavorites(param) {
    this.setState({
      loading: true,
    });
    const { favoritesMusics } = this.state;
    console.log(favoritesMusics);
    await removeSong(param);
    // const results = favoritesMusics.filter((element, index) => (
    //   element[index].check === true
    // ));
    this.setState({
      loading: false,
      check: false,
    });
    const { funcRemove } = this.props;
    if (funcRemove) {
      funcRemove();
    }
  }

  // async funcRemove() {
  //   const favorites = await getFavoriteSongs();
  // }

  render() {
    const { infoAlbum } = this.props;
    const { loading, check } = this.state;
    return (
      <div>
        { loading ? (<Loading loading={ loading } />)
          : (
            <div className={ styles.container }>
              <div className={ styles.item }>
                <p>{ infoAlbum.trackName }</p>
              </div>
              <audio
                data-testid="audio-component"
                src={ infoAlbum.previewUrl }
                controls
              >
                <track kind="captions" />
                {' '}
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor="Favorita">
                <input
                  type="checkbox"
                  id="Favorita"
                  name="Favorita"
                  data-testid={ `checkbox-music-${infoAlbum.trackId}` }
                  onChange={ this.handleChange }
                  checked={ check }
                />
                Favorita
              </label>
            </div>) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  infoAlbum: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  funcRemove: PropTypes.func.isRequired,
};
export default MusicCard;
