import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import mockData from './helpers/mockData';
// import mockFetch from '../../cypress/mocks/fetch';
import WalletForm from '../components/WalletForm';

// const mockStore = {
//   user: {
//     email: 'email@email.com',
//   },
//   wallet: {
//     currencies: [],
//     expenses: [],
//     editor: false,
//     idToEdit: 0,
//   },
// };

describe('testa do componente header', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('elementos aparecem na tela', () => {
    renderWithRouterAndRedux(<WalletForm />, {}, '/carteira');

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    const btnDespesa = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();

    expect(btnDespesa).toBeInTheDocument();
  });
  test('testa se um fetch foi chamado no inicio da pagina', () => {
    renderWithRouterAndRedux(<WalletForm />, {}, '/carteira');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
  test('testa se ao preencher o form, o botão fica habilitado e ao ser clicado, limpa os inputs', async () => {
    renderWithRouterAndRedux(<WalletForm />, {}, '/carteira');

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

    // expect(btnDespesa).toHaveAttribute('disabled');
    // expect(valueInput.value).toBe('');

    await waitFor(() => {
      expect(valueInput.value).toBe('');
      expect(descriptionInput.value).toBe('');
    });
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
