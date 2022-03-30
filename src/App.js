import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginName: '',
      btnInactive: true,
      loading: false,
      goToAnotherPage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validationInput = this.validationInput.bind(this);
    this.fetchName = this.fetchName.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validationInput());
  }

  validationInput() {
    const { loginName } = this.state;
    const numberhabilitation = 3;
    if (loginName.length >= numberhabilitation) {
      this.setState({ btnInactive: false });
    } else {
      this.setState({ btnInactive: true });
    }
  }

  async fetchName() {
    this.setState({ loading: true });
    const { loginName } = this.state;
    await createUser({ name: loginName });
    this.setState({
      loading: false,
      goToAnotherPage: true });
  }

  render() {
    const { loginName, btnInactive, loading, goToAnotherPage } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          {loading && <Loading />}
          <Route
            exact
            path="/"
            render={ () => (
              goToAnotherPage ? <Redirect to="/search" />
                : (
                  <Login
                    loginName={ loginName }
                    handleChange={ this.handleChange }
                    btnInactive={ btnInactive }
                    fetchName={ this.fetchName }
                  />)
            ) }

          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
