import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from './Table';
import EditExpenseForm from './EditExpenseForm';
import AddExpenseForm from './AddExpenseForm';

class WalletForm extends Component {
  render() {
    const { editor } = this.props;

    return (
      <div className="walletForm__wrapper">
        { !editor ? <AddExpenseForm /> : <EditExpenseForm />}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
