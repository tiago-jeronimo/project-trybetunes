import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import styles from './Header.module.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: true,
    };
    this.functionGetUser = this.functionGetUser.bind(this);
  }

  componentDidMount() {
    this.functionGetUser();
  }

  async functionGetUser() {
    const user = await getUser();
    this.setState({
      user: user.name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <div className={ styles.containerLink }>
          <Link
            className={ styles.flexItems }
            to="/search"
            data-testid="link-to-search"
          >
            Search

          </Link>
          <Link
            className={ styles.flexItems }
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            className={ styles.flexItems }
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
        </div>
        <h1>Bem Vindo</h1>

        <Loading loading={ loading } className={ styles.loading } />
        <h1 data-testid="header-user-name">
          {user}
        </h1>
      </header>
    );
  }
}

export default Header;
