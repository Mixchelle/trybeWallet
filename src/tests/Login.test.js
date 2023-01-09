import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o component Login e se...', () => {
  test('Renderiza os elementos corretos', () => {
    renderWithRedux(<Login />);
    const inputEmail = screen.getByText(/email:/i);
    const inputSenha = screen.getByText(/senha:/i);
    const buttEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(buttEntrar).toBeInTheDocument();
  });
  test('inicia com o botão desabilitado, e se ele é habilitado após ser preenchido com as informações corretas', () => {
    renderWithRedux(<Login />);
    const EMAIL_USER_INVALID = 'email@email';
    const PASSWORD_USER_INVALID = 123;
    const inputEmail = screen.getByText(/email:/i);
    const inputSenha = screen.getByText(/senha:/i);
    expect(screen.getByRole('button', {
      name: /entrar/i,
    })).toBeDisabled();
    userEvent.type(inputEmail, EMAIL_USER_INVALID);
    userEvent.type(inputSenha, PASSWORD_USER_INVALID);
    expect(screen.getByRole('button', {
      name: /entrar/i,
    })).toBeDisabled();
    userEvent.type(inputEmail, 'alguem@email.com');
    userEvent.type(inputSenha, 'password123456');
    const buttEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(buttEntrar).not.toBeDisabled();
  });
  test('quando o botão é clicado redireciona para a pagina /carteira', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    console.log(history);

    expect(history.location.pathname).toBe('/');
    const inputEmail = screen.getByText(/email:/i);
    const inputSenha = screen.getByText(/senha:/i);

    userEvent.type(inputEmail, 'alguem@email.com');
    userEvent.type(inputSenha, 'password123456');

    const buttEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(buttEntrar).not.toBeDisabled();
    userEvent.click(buttEntrar);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
