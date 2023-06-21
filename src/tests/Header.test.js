import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mockData from './helpers/mockData';

import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
// import mockData from './helpers/mockData';

const mockStore = {
  user: {
    email: 'email@email.com',
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

describe('testa do componente header', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  const totalFieldId = 'total-field';

  test('elementos aparecem na tela', () => {
    renderWithRouterAndRedux(<App />, mockStore, '/carteira');

    const totalField = screen.getByTestId(totalFieldId);

    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('0');

    const currencyField = screen.getByTestId('header-currency-field');

    expect(currencyField).toBeInTheDocument();
    expect(currencyField).toHaveTextContent('BRL');

    const emailField = screen.getByTestId('email-field');

    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveTextContent('email@email.com');
  });
  test('testa se o número total muda ao adicionar despesa', async () => {
    const { store } = renderWithRouterAndRedux(<App />, mockStore, '/carteira');

    const totalField = screen.getByTestId(totalFieldId);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const btnDespesa = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(btnDespesa).toBeDisabled();

    act(() => {
      userEvent.type(valueInput, '120');
      userEvent.type(descriptionInput, 'Lagosta');
    });

    expect(valueInput.value).toBe('120');
    expect(descriptionInput.value).toBe('Lagosta');

    expect(btnDespesa).not.toBeDisabled();

    act(() => {
      userEvent.click(btnDespesa);
    });

    await waitFor(() => {
      expect(totalField).toHaveTextContent('570.37');
      expect(store.getState().wallet.expenses).toHaveLength(1);
      expect(store.getState().wallet.expenses).toHaveLength(1);
    });
  });
  test('se o expenses estiver vazio, o valor do total field é 0', () => {
    const { store } = renderWithRouterAndRedux(<App />, mockStore, '/carteira');
    const totalField = screen.getByTestId(totalFieldId);

    expect(store.getState().wallet.expenses).toHaveLength(0);
    expect(totalField).toHaveTextContent('0');
  });
});

// {
//   value: '5',
//   description: 'Donut',
//   currency: 'USD',
//   method: 'Dinheiro',
//   tag: 'Alimentação',
//   id: 0,
//   exchangeRates: mockData,
// },
// {
//   value: '120',
//   description: 'Anime',
//   currency: 'JPY',
//   method: 'Dinheiro',
//   tag: 'Lazer',
//   id: 1,
//   exchangeRates: mockData,
// },
