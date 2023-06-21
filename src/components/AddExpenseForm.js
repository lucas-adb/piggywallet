import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../redux/actions';

class AddExpenseForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  fetchExchangeRates = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    return data;
  };

  handleSubmit = async (event, dispatch) => {
    event.preventDefault();

    const dataExchangeRates = await this.fetchExchangeRates();

    const {
      value, description, currency, method, tag, id,
    } = this.state;

    dispatch(addExpense(
      {
        value,
        description,
        currency,
        method,
        tag,
        id,
        exchangeRates: dataExchangeRates,
      },
    ));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: id + 1,
    });
  };

  handleDisable = () => {
    const { value, description } = this.state;
    const numberRegex = /^-?\d*\.?\d+$/;
    const isValueValid = numberRegex.test(value);
    const isDescriptionValid = description.length > 0;
    // se algum estado tiver vazio, o botão fica desativado
    return !(isValueValid && isDescriptionValid);
  };

  render() {
    const { currencies, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form className="addExpense_Form">
        <label htmlFor="valor">
          Valor:
          <input
            className="addExpense_input"
            id="value"
            name="value"
            type="text"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição da despesa:
          <input
            className="addExpense_input"
            id="description"
            name="description"
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            className="addExpense_select"
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.length > 0
              ? (
                currencies.map((c, index) => (
                  <option key={ index }>{ c }</option>
                ))
              )
              : <option>Selecione uma categoria</option>}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            className="addExpense_select"
            id="method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria de despesa:
          <select
            className="addExpense_select"
            id="tag"
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          className="addExpense__button"
          type="submit"
          onClick={ (event) => this.handleSubmit(event, dispatch) }
          disabled={ this.handleDisable() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

AddExpenseForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
}.isRequired;

export default connect(mapStateToProps)(AddExpenseForm);
