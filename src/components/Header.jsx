import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
        <h1>Eu sou um cabeçalho</h1>
        <Loading loading={ loading } />
        <h1 data-testid="header-user-name">
          {user}
        </h1>
      </header>
    );
  }
}

export default Header;
