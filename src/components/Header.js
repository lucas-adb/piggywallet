import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    sumTotal: 0,
  };

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      this.sumTotalInBRL();
    }
  }

  sumTotalInBRL = () => {
    const { expenses } = this.props;
    const expensesAr = expenses;

    if (expensesAr.length <= 0) {
      // pq 0.00 aqui e no outro teste tem que ser 0 ???
      this.setState({ sumTotal: '0.00' });
      return;
    }

    const data = {
      currency: expensesAr.map((e) => e.currency),
      value: expensesAr.map((e) => e.value),
      ask: expensesAr.map((e) => e.exchangeRates[e.currency].ask),
    };

    let sum = 0;

    for (let index = 0; index < data.value.length; index += 1) {
      const numValue = parseFloat(data.value[index]);
      const numAsk = parseFloat(data.ask[index]);
      sum += numValue * numAsk;
    }

    sum = sum.toFixed(2);

    this.setState({ sumTotal: String(sum) });
  };

  render() {
    const { email } = this.props;
    const { sumTotal } = this.state;

    return (
      <div className="header_wrapper">
        <h1 className="header_h1"><span className='pig__span'>🐷</span> PiggyWallet</h1>
        <p className="header__p__total">
          Total de despesas:
          {' '}
          <span data-testid="total-field" className="header__total__number">
            { sumTotal }
          </span>
          {' '}
          <span data-testid="header-currency-field" className="header__total__number">
            BRL
          </span>
        </p>
        <p data-testid="email-field" className="header__email">{email}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
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

export default connect(mapStateToProps)(Header);
