// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const saveUserEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const fetchAPI = () => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await request.json();
  const currenciesArray = Object.keys(response);
  const index = currenciesArray.indexOf('USDT');
  currenciesArray.splice(index, 1);
  dispatch(saveCurrencies(currenciesArray));
};

export function fetchExchangeRate(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(saveMyExpenses(expense, data));
  };
}

export const loadExpenses = (expenses) => {
  console.log('expenses', expenses);
  return {
    type: SAVE_EXPENSES,
    payload: expenses,
  };
};

export const deleteItem = (expenses) => ({
  type: DELETE_EXPENSES,
  payload: expenses,
});

export function saveEditedExpense(editedExpense) {
  return {
    type: SAVE_EDITED_EXPENSE,
    payload: editedExpense,
  };
}
