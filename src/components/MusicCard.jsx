import React from 'react';
import PropTypes from 'prop-types';
import styles from './MusicCard.module.css';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      check: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.functionFavorites = this.functionFavorites.bind(this);
    this.functionRemoveFavorites = this.functionRemoveFavorites.bind(this);
  }

  handleChange({ target }) {
    const { infoAlbum } = this.props;
    const { checked } = target;
    return (checked) ? this.functionFavorites(infoAlbum)
      : this.functionRemoveFavorites(infoAlbum);
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
    await removeSong(param);
    this.setState({
      loading: false,
      check: false,
    });
  }

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
              <label htmlFor="scales">
                <input
                  type="checkbox"
                  name="favorite"
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
};
export default MusicCard;
