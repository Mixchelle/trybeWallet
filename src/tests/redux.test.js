import wallet from '../redux/reducers/wallet';
import mockData from './helpers/mockData';
import {
  saveCurrencies,
  saveExpenses,
  deleteItem,
  editExpense,
  saveEditedExpense,
} from '../redux/actions/index';

const state = {
  currencies: ['USD'],
  expenses: [
    {
      id: 0,
      value: '10',
      description: 'bala',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    }],
  editor: false,
  idToEdit: 0,
};

const stateTest = {
  currencies: ['USD'],
  expenses: [
    {
      id: 0,
      value: '10',
      description: 'bala',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      exchangeRates: mockData,
    },
    {
      id: 1,
      value: '20',
      description: 'ASIUDAGUSA',
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Saúde',
      exchangeRates: mockData,
    }],
  editor: false,
  idToEdit: 0,
};

const newExpense = {
  value: '15',
  description: 'maça',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const stateVazio = { expenses: [] };

describe('Testa o reducer Wallet', () => {
  test('Testa os cases do reduce', () => {
    expect(wallet(state, saveCurrencies(['USD']))).toStrictEqual({ ...state, currencies: ['USD'] });
    expect(wallet(state, saveExpenses(newExpense, mockData)))
      .toStrictEqual({ ...state,
        expenses: [...state.expenses, {
          ...newExpense,
          id: 1,
          exchangeRates: mockData,
        }] });
    expect(wallet(stateVazio, saveExpenses(newExpense, mockData)))
      .toStrictEqual({ ...stateVazio,
        expenses: [...stateVazio.expenses, {
          ...newExpense,
          id: 0,
          exchangeRates: mockData,
        }] });
    expect(wallet(state, deleteItem(state.expenses[0])))
      .toStrictEqual({ ...state, expenses: [] });
    expect(wallet(state, editExpense(state.expenses[0])))
      .toStrictEqual({ ...state, editor: true, idToEdit: 0 });
  });

  test('Testa case saveEditedExpense', () => {
    expect(wallet({ ...stateTest, editor: true }, saveEditedExpense({ ...stateTest.expenses[0], value: '2' })))
      .toStrictEqual({ ...stateTest,
        editor: false,
        expenses: stateTest.expenses
          .map((expense) => (stateTest.idToEdit === expense.id
            ? { ...expense, value: '2' } : expense)) });
  });
});
