import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log({ email, expenses });
    const totalExpense = expenses
      .reduce((acc, currValue) => (acc + Number(currValue.value)
  * Number(currValue.exchangeRates[currValue.currency]?.ask)), 0).toFixed(2);
    const cambio = 'BRL';
    return (
      <header>
        <h3 data-testid="email-field">{ email }</h3>
        <section>
          <h3>
            Despesa total:
          </h3>
          <h3 data-testid="total-field">
            { totalExpense }
          </h3>
          <h3 data-testid="header-currency-field">
            Câmbio:
            { ' ' }
            { cambio }
          </h3>
        </section>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
