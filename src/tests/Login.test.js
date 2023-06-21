import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('testa página de login', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const fakeEmail = 'email@email.com';

  test('componentes aparecem na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const btnEnter = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnEnter).toBeInTheDocument();
    expect(btnEnter).toHaveTextContent('Entrar');
  });
  test('botão desabilita com email e senha corretamente preenchidos', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const btnEnter = screen.getByRole('button');

    expect(btnEnter).toHaveProperty('disabled', true);

    act(() => {
      userEvent.type(inputEmail, fakeEmail);
      userEvent.type(inputPassword, '123456');
    });

    expect(btnEnter).toHaveProperty('disabled', false);
  });
  test('email é salvo no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const btnEnter = screen.getByRole('button');

    expect(btnEnter).toHaveProperty('disabled', true);

    act(() => {
      userEvent.type(inputEmail, fakeEmail);
      userEvent.type(inputPassword, '123456');
      userEvent.click(btnEnter);
    });

    expect(store.getState().user.email).toBe(fakeEmail);
  });
});
