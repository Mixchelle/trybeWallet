// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_CURRENCIES,
  SAVE_EXPENSES,
  DELETE_EXPENSES,
  EDIT_EXPENSE,
  SAVE_EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses:
        [...state.expenses,
          { id: state.expenses.length
            ? state.expenses[state.expenses.length - 1].id + 1
            : 0,
          ...action.payload,
          exchangeRates: action.prices,
          },
        ],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => (expense.id !== action.payload.id)),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idEdit: action.payload.id,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (
          state.idEdit === expense.id ? { ...expense, ...action.payload } : expense)),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
