/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, fetchExchange } from '../redux/actions';
import '../estilo/formTable.css';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: '',
    tag: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
    this.loadExpenses();
  }

  componentDidUpdate(prevProps) {
    const { idToEdit: prevIdToEdit, editor: prevEditor } = prevProps;
    const { idToEdit, editor, expenses } = this.props;
    if (idToEdit !== prevIdToEdit || editor !== prevEditor) {
      const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
      if (expenseToEdit) {
        this.setState({
          value: expenseToEdit.value,
          description: expenseToEdit.description,
          currency: expenseToEdit.currency,
          method: expenseToEdit.method,
          tag: expenseToEdit.tag,
        });
      }
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    dispatch(fetchExchange(this.state));
    this.setState(
      (prevState) => ({
        id: prevState.id + 1,
      }),
      () => {
        const { id } = this.state;
        console.log(id);
      },
    );
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
    this.saveExpense();
  };

  saveExpense = () => {
    const { value, description, currency, method, tag } = this.state;
    const { email } = this.props;
    const expense = { value, description, currency, method, tag };

    const expenses = JSON.parse(localStorage.getItem(email)) || [];
    expenses.push(expense);

    localStorage.setItem(email, JSON.stringify(expenses));
  };

  loadExpenses = () => {
    const { email } = this.props;
    const expenses = JSON.parse(localStorage.getItem(email)) || [];
    this.setState({
      id: expenses.length,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    console.log({ value, id });
    return (
      <form className="form-inline">
        <div className="form-group mr-3">
          <label htmlFor="value" className="form-label mr-2">
            Valor
          </label>
          <input
            placeholder="Valor"
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            className="form-control"
            onChange={ this.handleChange }
            value={ value }
          />
        </div>
        <div className="form-group mr-3">
          <label htmlFor="description" className="form-label mr-2">
            Descrição:
          </label>
          <input
            placeholder="Descrição"
            data-testid="description-input"
            name="description"
            className="form-control"
            value={ description }
            onChange={ this.handleChange }
          />
        </div>
        <div className="form-group mr-3">
          <label htmlFor="currency" className="form-label mr-2">
            Moeda:
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            defaultValue={ currency }
            className="form-select"
            onChange={ this.handleChange }
          >
            {currencies.map((item) => (
              <option key={ item } value={ item }>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mr-3">
          <label htmlFor="method" className="form-label mr-2">
            Forma de pagamento:
          </label>
          <select
            data-testid="method-input"
            name="method"
            defaultValue={ method }
            className="form-select"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </div>
        <div className="form-group mr-3">
          <label htmlFor="tag-input" className="form-label mr-2">
            Categoria:
          </label>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            className="form-select"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="button"
          className="bttn-add"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
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
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
  email: state.user.email,
});

export default connect(mapStateToProps)(WalletForm);
