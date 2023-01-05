// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

export const saveUserEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const loadExpenses = (expense, prices) => ({
  type: SAVE_EXPENSES,
  payload: expense,
  prices,
});

export const deleteItem = (expenses) => ({
  type: DELETE_EXPENSES,
  payload: expenses,
});

export const updateTotalExpenses = () => ({
  type: 'UPDATE_TOTAL_EXPENSES' });

export const saveEditedExpense = (expense) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: expense,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const fetchAPI = () => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await request.json();
  const currenciesArray = Object.keys(response);
  const index = currenciesArray.indexOf('USDT');
  currenciesArray.splice(index, 1);
  dispatch(saveCurrencies(currenciesArray));
};

export const fetchExchange = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(loadExpenses(expense, data));
};
