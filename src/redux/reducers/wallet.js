// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  RECEIVE_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, OPEN_EDIT_MODE, EDIT_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((cur) => cur !== 'USDT'),
      // currencies: Object.keys(action.currencies),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expense,
        // exchangeRates: 1,
      }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: (state.expenses).filter((e) => e.id !== action.expenseDeletedId),
    };
  case OPEN_EDIT_MODE:
    return {
      ...state,
      editor: true,
      idToEdit: action.idToEdit,
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      expenses: action.newExpenses,
      editor: false,
    };
  default:
    return state;
  }
};

export default walletReducer;

// case ADD_EXPENSE:
//   return {
//     ...state,
//     expenses: [...state.expenses, {
//       ...action.expense,
//       id: 0,
//       exchangeRates: 'USD',
//     }],
//   };

// case DELETE_EXPENSE:
//   return {
//     ...state,
//     expenses: [{
//       ...action.newExpenses,

//     }],
//   };
