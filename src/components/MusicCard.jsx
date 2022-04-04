import React from 'react';
import PropTypes from 'prop-types';
import styles from './MusicCard.module.css';

class MusicCard extends React.Component {
  render() {
    const { infoAlbum } = this.props;
    return (
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
