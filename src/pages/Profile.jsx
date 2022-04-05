import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: [],
    };
    this.requestUser = this.requestUser.bind(this);
  }

  componentDidMount() {
    this.requestUser();
  }

  async requestUser() {
    this.setState({
      loading: true,
    });
    const infoUser = await getUser();
    this.setState({
      loading: false,
      user: infoUser,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h2>This is Profile</h2>
        {loading ? (<Loading loading={ loading } />) : (
          <section>
            <img
              className="image"
              data-testid="profile-image"
              src={ user.image }
              alt={ `Imagem do usuário: ${user.name}` }
            />
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <p>{user.description}</p>
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>

          </section>)}
      </div>
    );
  }
}

export default Profile;
