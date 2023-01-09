import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import { editExpense } from '../redux/actions';

describe('Testa o componente WalletForm', () => {
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
    expect(buttonSaveEdit.innerHTML).toBe('Editar despesa');
  });
});
