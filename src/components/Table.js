import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, openEditMode } from '../redux/actions';
import editIcon from '../img/edit.svg';
// import deleteIcon from '../img/delete.svg';

class Table extends Component {
  convertValue = (value, ask) => {
    const newValue = value * ask;
    return newValue.toFixed(2);
  };

  fixDecimals = (num) => {
    const newNum = Number(num);
    return newNum.toFixed(2);
  };

  handleDelete = ({ target }) => {
    const { dispatch } = this.props;

    const parentNode = target.parentElement;
    const expenseDeletedId = Number(parentNode.parentElement.id);

    dispatch(deleteExpense(expenseDeletedId));
  };

  handleEdit = ({ target }) => {
    const { dispatch } = this.props;

    const parentNode = target.parentElement;
    const expenseDeletedId = Number(parentNode.parentElement.id);

    dispatch(openEditMode(expenseDeletedId));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody key="body-table-expenses">
          { expenses.length > 0 && expenses.map((e) => (
            <tr key={ e.id } id={ e.id }>
              <td>{ e.description }</td>
              <td>{ e.tag }</td>
              <td>{ e.method }</td>
              <td>{ this.fixDecimals(e.value) }</td>
              <td>{ e.exchangeRates[e.currency].name }</td>
              <td>
                { this.fixDecimals(e.exchangeRates[e.currency].ask) }
              </td>
              <td>
                { this.convertValue(e.value, e.exchangeRates[e.currency].ask) }
              </td>
              <td>Real</td>
              <td>
                <button
                  className="deleteEdit__button"
                  data-testid="edit-btn"
                  onClick={ (event) => this.handleEdit(event) }
                >
                  {/* Editar */}
                  <img className="table__icons" src={ editIcon } alt="edit-icon" />
                </button>
                <button
                  className="deleteEdit__button"
                  data-testid="delete-btn"
                  onClick={ (event) => this.handleDelete(event) }
                >
                  {/* Excluir */}
                  {/* o icone abaixo quebra o teste do cypress */}
                  {/* <img className="table__icons" src={ deleteIcon } alt="delete-icon" /> */}
                  ✕
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          code: PropTypes.string.isRequired,
          codein: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          high: PropTypes.string.isRequired,
          low: PropTypes.string.isRequired,
          varBid: PropTypes.string.isRequired,
          pctChange: PropTypes.string.isRequired,
          bid: PropTypes.string.isRequired,
          ask: PropTypes.string.isRequired,
          timestamp: PropTypes.string.isRequired,
          create_date: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Table);
