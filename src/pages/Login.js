/* eslint-disable react/jsx-max-depth */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-magic-numbers */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { saveUserEmail } from '../redux/actions';
import '../estilo/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
  };

  handleChangeSenha = ({ target }) => {
    this.setState({ senha: target.value });
  };

  handleChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  enableBtn = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, senha } = this.state;
    return regex.test(email) && senha.length >= 6;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(saveUserEmail(email));
    history.push('/carteira');
  };

  handleGoogleLogin = () => {
    // Lógica para login com Google
  };

  handleFacebookLogin = () => {
    // Lógica para login com Facebook
  };

  render() {
    const { email, senha } = this.state;

    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2 className="title">TrybeWallet</h2>
          </div>
          <form onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <label>
                Email
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  value={ email }
                  onChange={ this.handleChange }
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Senha</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  value={ senha }
                  onChange={ this.handleChangeSenha }
                  required
                />
              </div>
            </div>
            <button
              data-testid="btn-entrar"
              type="submit"
              className="btn btn-primary"
              disabled={ !this.enableBtn() }
            >
              Entrar
            </button>
          </form>
          <div className="social-buttons">
            <button
              type="button"
              className="social-button google-button"
              onClick={ this.handleGoogleLogin }
            >
              <FaGoogle />
            </button>
            <button
              type="button"
              className="social-button facebook-button"
              onClick={ this.handleFacebookLogin }
            >
              <FaFacebook />
            </button>
            <button
              type="button"
              className="social-button linkedin-button"
              onClick={ this.handleLinkedInLogin }
            >
              <FaLinkedin />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
