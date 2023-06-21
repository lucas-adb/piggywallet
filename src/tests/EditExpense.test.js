import React from 'react';
import { screen } from '@testing-library/react';
// import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
// import EditExpenseForm from '../components/EditExpenseForm';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import mockData from './helpers/mockData';

const mockStore = {
  user: {
    email: 'email@email.com',
  },
  wallet: {
    currencies: [],
    expenses:
    [
      {
        value: '5',
        description: 'Donut',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        id: 0,
        exchangeRates: mockData,
      },
      {
        value: '120',
        description: 'Anime',
        currency: 'JPY',
        method: 'Dinheiro',
        tag: 'Lazer',
        id: 1,
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

describe('testa do componente EditExpenseForm', () => {
  test('elementos aparecem na tela', () => {
    renderWithRouterAndRedux(<App />, mockStore, '/carteira');

    // const btnsEditar = screen.getAllByRole('button', { class: 'Editar' });
    const btnsEditar = screen.getAllByTestId('edit-btn');

    const expenseDonut = screen.getByText('Donut');
    const expenseAnime = screen.getByText('Anime');

    expect(btnsEditar).toHaveLength(2);
    expect(expenseDonut).toBeInTheDocument();
    expect(expenseAnime).toBeInTheDocument();

    act(() => {
      userEvent.click(btnsEditar[0]);
    });

    const btnEditarDespesa = screen.getByRole('button', { name: 'Editar despesa' });
    expect(btnEditarDespesa).toBeInTheDocument();
  });
  test('elemente tem nome editado ao clicar Editar despesa', async () => {
    renderWithRouterAndRedux(<App />, mockStore, '/carteira');

    // const btnsEditar = screen.getAllByRole('button', { name: 'Editar' });
    const btnsEditar = screen.getAllByTestId('edit-btn');

    // const expenseDonut = screen.queryByText('Donut');

    act(() => {
      userEvent.click(btnsEditar[0]);
    });

    const btnEditarDespesa = screen.getByRole('button', { name: 'Editar despesa' });
    const descriptionInput = screen.getByTestId('description-input');

    act(() => {
      userEvent.type(descriptionInput, ' de Chocolate');
      userEvent.click(btnEditarDespesa);
    });

    // await waitFor(() => {
    //   expect(screen.getByText('Burger')).toBeInTheDocument();
    // });

    const newDonut = screen.getByText('Donut de Chocolate');
    expect(newDonut).toBeInTheDocument();
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
