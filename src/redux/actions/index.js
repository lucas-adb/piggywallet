// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_WALLET = 'ADD_WALLET';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const RECEIVE_CURRENCIES_STARTED = 'RECEIVE_CURRENCIES_STARTED';
export const ADD_EXPENSE = 'ADD_EXPENSE';
// export const RECEIVE_EXCHANGE_RATES = 'RECEIVE_EXCHANGE_RATES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
// export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const OPEN_EDIT_MODE = 'OPEN_EDIT_MODE';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

// export const addWallet = (wallet) => ({
//   type: ADD_WALLET,
//   wallet,
// });

export const receiveCurrenciesStarted = () => ({
  type: RECEIVE_CURRENCIES_STARTED,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

// export const receiveExchangeRates = (exchangeRates) => ({
//   type: RECEIVE_EXCHANGE_RATES,
//   exchangeRates,
// });

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(receiveCurrenciesStarted());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
  };
}

// export function fetchExchangeRates() {
//   return () => {
//     fetch('https://economia.awesomeapi.com.br/json/all')
//       .then((response) => response.json())
//       .then((exchangeRates) => exchangeRates);
//   };
// }

// export function fetchCurrencies() {
//   return (dispatch, _getState) => {
//     fetch('https://economia.awesomeapi.com.br/json/all')
//       .then((response) => response.json())
//       .then((currencies) => dispatch(receiveCurrencies(currencies)));
//   };
// }

export const deleteExpense = (expenseDeletedId) => ({
  type: DELETE_EXPENSE,
  expenseDeletedId,
});

export const openEditMode = (idToEdit) => ({
  type: OPEN_EDIT_MODE,
  idToEdit,
});

export const editExpenses = (newExpenses) => ({
  type: EDIT_EXPENSES,
  newExpenses,
});
