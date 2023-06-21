import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpenses } from '../redux/actions';

class editExpenseForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: {},
  };

  componentDidMount() {
    const { expenseData } = this.props;

    this.setState({
      value: expenseData.value,
      description: expenseData.description,
      currency: expenseData.currency,
      method: expenseData.method,
      tag: expenseData.tag,
      id: expenseData.id,
      exchangeRates: expenseData.exchangeRates,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event, dispatch) => {
    event.preventDefault();

    const { expenses } = this.props;
    const editedExpense = this.state;

    const newExpenses = expenses.map((expense) => {
      if (expense.id === editedExpense.id) {
        return editedExpense;
      }
      return expense;
    });

    dispatch(editExpenses(newExpenses));
  };

  handleDisable = () => {
    const { value, description } = this.state;
    const numberRegex = /^-?\d*\.?\d+$/;
    const isValueValid = numberRegex.test(value);
    const isDescriptionValid = description.length > 0;
    return !(isValueValid && isDescriptionValid);
  };

  render() {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    // const só para o lint não chorar com o exchangeRates no estado
    const NewCurrencies = Object.keys(exchangeRates).filter((e) => e !== 'USDT');

    return (
      <form className="EditExpense_Form">
        <label htmlFor="valor">
          Valor:
          <input
            className="editExpense_input"
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
            className="editExpense_input"
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
            className="editExpense_select"
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              NewCurrencies.map((c, index) => (
                <option key={ index }>{ c }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            className="editExpense_select"
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
            className="editExpense_select"
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
          className="editExpense__button"
          type="submit"
          onClick={ (event) => this.handleSubmit(event, dispatch) }
          disabled={ this.handleDisable() }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expenseData: state.wallet.expenses[state.wallet.idToEdit],
  expenseId: state.wallet.idToEdit,
  currencies: state.wallet.currencies,
});

editExpenseForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
}.isRequired;

export default connect(mapStateToProps)(editExpenseForm);
