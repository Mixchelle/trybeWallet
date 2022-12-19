import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    console.log({ email });
    const totalExpense = 0;
    const cambio = 'BRL';
    return (
      <header>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">
          Despesa total:
          { totalExpense }
        </h3>
        <h3 data-testid="header-currency-field">
          Câmbio:
          { cambio }
        </h3>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user.email,
});

export default connect(mapStateToProps)(Header);
