import React from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';

class Login extends React.Component {
  render() {
    const {
      loginName,
      handleChange,
      btnInactive,
      fetchName,
    } = this.props;

    return (
      <div data-testid="page-login" className={ styles.container }>

        <h1>Login</h1>

        <label htmlFor="labelInputName">
          Usúario
          <input
            data-testid="login-name-input"
            onChange={ handleChange }
            type="text"
            name="loginName"
            value={ loginName }
            placeholder="Nome"
            className={ styles.inputName }
          />
        </label>
        <button
          data-testid="login-submit-button"
          disabled={ btnInactive }
          type="submit"
          className={ styles.button }
          onClick={ fetchName }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  loginName: PropTypes.string.isRequired,
  btnInactive: PropTypes.bool.isRequired,
  fetchName: PropTypes.func.isRequired,
};
export default Login;
