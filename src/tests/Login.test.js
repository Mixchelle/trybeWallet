import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import Login from '../pages/Login';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';


describe('Testa o component Login', () => {
  test('se renderiza os elementos corretos', () => {
    renderWithRedux(<Login />);
    const email = screen.getByText(/email:/i);
    const senha = screen.getByText(/senha:/i);
    const buttEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(buttEntrar).toBeInTheDocument();
  });
  test('se inicia com o botão desabilitado, e se ele é habilitado após ser preenchido com as informações corretas', () => {
    renderWithRedux(<Login />);
    const EMAIL_USER_INVALID = 'email@email';
    const PASSWORD_USER_INVALID = 'a123';
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
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(inputSenha, '123456');
    const buttEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(buttEntrar).not.toBeDisabled();
  });
  test('quando o botão é clicado redireciona para a pagina /carteira', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    console.log(history);

    expect(history.location.pathname).toBe('/');
    const email = screen.getByText(/email:/i);
    const senha = screen.getByText(/senha:/i);

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, 'password123456');

    const buttEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(buttEntrar).not.toBeDisabled();
    userEvent.click(buttEntrar);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testa o component wallet', () => {
  test('renderiza os elemnetos corretamente', () => {
    renderWithRedux(<Wallet />);
    expect(screen.getByText(/email:/i)).toBeInTheDocument();
    expect(screen.getByTestId('total-field')).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', {
      name: /despesa/i,
    })).toBeInTheDocument();
    expect(screen.getByText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /adicionar despesa/i,
    })).toBeInTheDocument();
  });
  test('testa se é possivel adicionar e selecionar em todos os campos', async () => {
    renderWithRedux(<Wallet />);
    const despesas = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    const SelectCurrencies = await screen.getByTestId('currency-input');
    const currencie = await screen.findByRole('option', { name: 'USD' });
    const payMethodSelected = screen.getByTestId('method-input');
    const payMethod = screen.getByRole('option', { name: 'Cartão de crédito' });
    const selectTag = screen.getByTestId('tag-input');
    const tag = screen.getByRole('option', { name: 'Trabalho' });
    const bttAdcDespesas = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(despesas, '10');
    userEvent.type(descricao, 'dez');
    userEvent.selectOptions(SelectCurrencies, currencie);
    userEvent.selectOptions(payMethodSelected, payMethod);
    userEvent.selectOptions(selectTag, tag);
    userEvent.click(bttAdcDespesas);
  });

  test('testa se o valor dos inputs é limpo após clicar no botão', () => {
    renderWithRedux(<Wallet />);
    const despesas = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    const bttAdcDespesas = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(despesas, 5);
    userEvent.type(descricao, 'eu sou o mior');
    userEvent.click(bttAdcDespesas);

    expect(inputDespesas).toHaveTextContent('');
    expect(inputDescricao).toHaveTextContent('');
  });
});
