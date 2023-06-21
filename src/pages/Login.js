import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { addEmail } from '../redux/actions';
import pig3d from '../img/pig-3d.png';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
  };

  handleChangeEmail = ({ target: { value } }) => {
    // reseta o input para desativar o botão caso o usuário apague uma letra
    this.setState({ email: '' });

    // retorna uma booleano que valida se está em um formato de email
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

    if (isValidEmail) {
      this.setState({
        email: value,
      });
    }

    this.handleDisable();
  };

  handleChangeSenha = ({ target: { value } }) => {
    const minLength = 6;

    // reseta o input para desativar o botão caso o usuário apague uma letra
    this.setState({ senha: '' });

    if (value.length >= minLength) {
      this.setState({
        senha: value,
      });
    }

    this.handleDisable();
  };

  handleDisable = () => {
    const { email, senha } = this.state;
    const isLoginValid = email.length > 0;
    const isSenhaValid = senha.length > 0;
    // se algum estado tiver vazio, o botão fica desativado
    return !(isLoginValid && isSenhaValid);
  };

  render() {
    const { email } = this.state;
    const { dispatch } = this.props;

    return (
      <div className="login__wrapper__all">
        <div className="login__wrapper">
          <h1 className="login__h1">🐷 TrybeWallet</h1>
          <input
            className="login__input"
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
            name="email"
            onChange={ this.handleChangeEmail }
          />
          <input
            className="login__input"
            type="text"
            data-testid="password-input"
            placeholder="Senha"
            minLength={ 6 }
            name="senha"
            onChange={ this.handleChangeSenha }
          />
          <Link to="/carteira">
            <button
              className="login__button"
              disabled={ this.handleDisable() }
              onClick={ () => dispatch(addEmail(email)) }
            >
              Entrar
            </button>
          </Link>
        </div>
        <img className="login__pig" src={ pig3d } alt="edit-icon" />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
