import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserEmail } from '../redux/actions';
// import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
  };

  handleChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handleChangeSenha = ({ target }) => {
    this.setState({ senha: target.value });
  };

  enableBtn = () => {
    const regex = /^\S+@\S+\.\S+$/;
    const { email, senha } = this.state;
    const minLength = 6;
    const emailchek = regex.test(email);
    const senhaChek = senha.length >= minLength;
    return emailchek && senhaChek;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveUserEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, senha } = this.state;
    const { dispatch } = this.props;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ senha }
          onChange={ this.handleChangeSenha }
        />
        <button
          type="submit"
          disabled={ !this.enableBtn() }
          onClick={ () => dispatch(addEmailAndPassword(emailInput)) }
        >
          Entrar
        </button>
      </form>
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
