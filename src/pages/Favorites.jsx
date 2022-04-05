import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favoritesMusics: [],
    };
    this.FavoriteSongs = this.FavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.FavoriteSongs();
  }

  async componentDidUpdate() {
    const data = await getFavoriteSongs();
    const func = () => {
      this.setState({
        favoritesMusics: data,
      });
    };
    func();
  }

  async FavoriteSongs() {
    this.setState({
      loading: true,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritesMusics: favorites });
  }

  render() {
    const { loading, favoritesMusics } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Favorites</h2>
        { loading ? (<Loading loading={ loading } />)
          : (favoritesMusics.map((element, index) => (
            <MusicCard
              key={ index }
              infoAlbum={ element }
            />
          ))
          )}
      </div>
    );
  }
}

export default Favorites;
