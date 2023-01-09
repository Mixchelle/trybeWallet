import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../../pages/Wallet';
import { renderWithRedux } from './renderWith';

describe('Testa o component wallet e se...', () => {
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
  test('testa se o valor dos inputs é limpo após clicar no botão', () => {
    renderWithRedux(<Wallet />);
    const inputDespesas = screen.getByTestId('value-input');
    const inputDescricao = screen.getByTestId('description-input');
    const bttAdcDespesas = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(inputDespesas, 5);
    userEvent.type(inputDescricao, 'eu sou o mior');
    userEvent.click(bttAdcDespesas);

    expect(inputDespesas).toHaveTextContent('');
    expect(inputDescricao).toHaveTextContent('');
  });
  test('testa se é possivel adicionar e selecionar em todos os campos', async () => {
    renderWithRedux(<Wallet />);
    const inputDespesas = screen.getByTestId('value-input');
    const inputDescricao = screen.getByTestId('description-input');
    const SelectCurrencies = await screen.getByTestId('currency-input');
    const currencie = await screen.findByRole('option', { name: 'USD' });
    const payMethodSelected = screen.getByTestId('method-input');
    const payMethod = screen.getByRole('option', { name: 'Cartão de crédito' });
    const selectTag = screen.getByTestId('tag-input');
    const tag = screen.getByRole('option', { name: 'Trabalho' });
    const bttAdcDespesas = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.type(inputDespesas, '5');
    userEvent.type(inputDescricao, 'test input descrição');
    userEvent.selectOptions(SelectCurrencies, currencie);
    userEvent.selectOptions(payMethodSelected, payMethod);
    userEvent.selectOptions(selectTag, tag);
    userEvent.click(bttAdcDespesas);
  });
});
