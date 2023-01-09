import React from 'react';
import userEvent from '@testing-library/user-event';

import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { editExpense } from '../redux/actions';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';
import mockData from './helpers/mockData';

describe('Testa o componente WalletForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const initialState = {
    wallet: {
      currencies: ['USD'],
      expenses: [
        {
          id: 1,
          value: '10',
          description: 'bala',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: mockData,
        }],
      editor: false,
      idToEdit: 0,
    },
  };
  test('Testa se renderiza o formulário', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const valueInput = screen.getByRole('textbox', {
      name: /valor:/i,
    });

    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });

    const coinInput = screen.getByRole('combobox', {
      name: /moeda:/i,
    });

    const paymentInput = screen.getByTestId('method-input');

    const tagInput = screen.getByRole('combobox', {
      name: /tag:/i,
    });
    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(coinInput).toBeInTheDocument();
    expect(paymentInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('Testa se as informções do formulário estão no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const button = screen.getByTestId('button');

    const valueInput = screen.getByRole('textbox', {
      name: /valor:/i,
    });

    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });

    const coinInput = screen.getByRole('combobox', {
      name: /moeda:/i,
    });

    const paymentInput = screen.getByTestId('method-input');

    const tagInput = screen.getByRole('combobox', {
      name: /tag:/i,
    });

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'bala');
    userEvent.selectOptions(coinInput, ['USD']);
    userEvent.selectOptions(paymentInput, ['Dinheiro']);
    userEvent.selectOptions(tagInput, ['Alimentação']);
    userEvent.click(button);

    expect(store.getState().wallet.expenses.length).toBe(1);
  });
  test('Testa botão editar despesa', () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const buttonSaveEdit = screen.getByTestId('button');
    const buttonEdit = screen.getByRole('button', {
      name: /editar/i,
    });
    userEvent.click(buttonEdit);
    store.dispatch(editExpense(initialState.wallet.expenses[0]));
    expect(buttonSaveEdit.innerHTML).toBe('Adicionar despesa');
  });
  test('se a página Wallet é renderizada corretamente com Table', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(history.location.pathname).toBe('/carteira');

    const table = screen.getByRole('table');
    const columnDescription = screen.getByRole('columnheader', { name: /descrição/i });
    const columnTag = screen.getByRole('columnheader', { name: /tag/i });
    const columnMethod = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const columnValue = screen.getByRole('columnheader', { name: 'Valor' });
    const columnCurrency = screen.getByRole('columnheader', { name: 'Moeda' });
    const columnExchangeRate = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const columnValueExchanged = screen.getByRole('columnheader', { name: /valor convertido/i });
    const columnExchageCurrency = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const columnEditExclude = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(table).toBeInTheDocument();
    expect(columnDescription).toBeInTheDocument();
    expect(columnTag).toBeInTheDocument();
    expect(columnMethod).toBeInTheDocument();
    expect(columnValue).toBeInTheDocument();
    expect(columnCurrency).toBeInTheDocument();
    expect(columnExchangeRate).toBeInTheDocument();
    expect(columnValueExchanged).toBeInTheDocument();
    expect(columnExchageCurrency).toBeInTheDocument();
    expect(columnEditExclude).toBeInTheDocument();
  });

  test('se ao digitar nos inputs e clicar no botão, uma nova despesa é adicionada', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputMethod = screen.getByTestId('method-inputnput');
    const inputTag = screen.getByTestId('tag-input');
    const addExpenseButton = screen.getByTestId('button');

    act(() => {
      userEvent.type(inputValue, '200');
      userEvent.type(inputDescription, 'Fazendo os testes da aplicação');
      userEvent.selectOptions(inputMethod, 'Cartão de crédito');
      userEvent.selectOptions(inputTag, 'Lazer');

      userEvent.click(addExpenseButton);

      userEvent.type(inputValue, '50');
      userEvent.type(inputDescription, 'Nova despesa para testar');
      userEvent.selectOptions(inputMethod, 'Dinheiro');
      userEvent.selectOptions(inputTag, 'Transporte');

      userEvent.click(addExpenseButton);
    });

    waitFor(async () => {
      expect(screen.getByRole('cell', { name: /fazendo os testes da aplicação/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /nova despesa para testar/i })).toBeInTheDocument();
    });

    expect(global.fetch).toBeCalledTimes(3);
  });

  test('se ao clicar no botão de excluir, a despesa é excluída', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const addExpenseButton = screen.getByTestId('button');

    userEvent.type(inputValue, '100');
    userEvent.type(inputDescription, 'cem');
    userEvent.click(addExpenseButton);

    waitFor(() => {
      expect(screen.getByText('cem')).toBeInTheDocument();
      const deleteButton = screen.getByTestId('delete-btn');
      userEvent.click(deleteButton);

      expect(screen.queryByText('cem')).not.toBeInTheDocument();
    });
  });
});
