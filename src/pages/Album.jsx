import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoAlbum: [],
      nameArtist: '',
      albumName: '',
    };
    this.requestAlbum = this.requestAlbum.bind(this);
  }

  componentDidMount() {
    this.requestAlbum();
  }

  async requestAlbum() {
    const idAlbum = document.URL.split('/')[4];
    const request = await getMusics(idAlbum);
    this.setState({
      infoAlbum: request,
      nameArtist: request[0].artistName,
      albumName: request[0].collectionName,
    });
  }

  render() {
    const { infoAlbum, nameArtist, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <p>This is Album</p>
        <Header />
        <div>
          <h3 data-testid="artist-name">{ nameArtist }</h3>
          <h4 data-testid="album-name">{ albumName }</h4>
        </div>
        {
          infoAlbum.map((element, index) => (
            index !== 0 ? (
              <MusicCard key={ index } infoAlbum={ element } />
            ) : (
              null
            )
          ))
        }
      </div>
    );
  }
}

export default Album;
