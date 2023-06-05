import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaMoneyBillAlt, FaUser, FaWallet } from 'react-icons/fa';
import '../estilo/header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpense = expenses.reduce((acc, currValue) => (
      acc + Number(currValue.value)
       * Number(currValue.exchangeRates[currValue.currency]?.ask)
    ), 0).toFixed(2);
    const cambio = 'BRL';

    return (
      <header className="header">
        <div className="header-itens">
          <div className="header-logo">
            <div className="div_header_icones">
              <FaWallet className="header-icon" />
              <h2>TrybeWallet</h2>
            </div>
          </div>
          <div className="header-item-email">
            <FaUser className="header-icon" />
            <h3 data-testid="email-field">{email}</h3>
          </div>
          <div className="header-item-despesa">
            <FaMoneyBillAlt className="header-icon" />
            <span>Despesa total:</span>
            <h4 data-testid="total-field">{totalExpense}</h4>
          </div>
          <div className="div_header_icones">
            <span data-testid="header-currency-field">Câmbio:</span>
            <p data-testid="header-currency-value">{cambio}</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
