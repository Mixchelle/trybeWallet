import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, editExpense } from '../redux/actions/index';

class Table extends Component {
  editItem = (id) => {
    const { dispatch, expenses } = this.props;
    dispatch(editExpense(id));
    console.log({ expenses }, 'edita');
  };

  removeItem = (id) => {
    const { dispatch, expenses } = this.props;
    const deleteExpense = expenses.filter((e) => e.id !== id);
    dispatch(deleteItem(deleteExpense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr className="tableHeader">
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
          <tbody>
            {expenses.length
            && expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency]?.name}</td>
                <td>
                  {
                    new Intl
                      .NumberFormat('en-US', { style: 'currency', currency: 'BRL' })
                      .format(expense.exchangeRates[expense.currency]?.ask)
                  }

                </td>
                <td>
                  {
                    new Intl
                      .NumberFormat('en-US', { style: 'currency', currency: 'BRL' })
                      .format(Number(expense.value)
                      * Number(expense.exchangeRates[expense.currency]?.ask))
                  }

                </td>
                <td>Real Brasileiro</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editItem(expense.id) }
                  >
                    Editar despesa
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    id="Excluir"
                    onClick={ () => this.removeItem(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangesRates: PropTypes.shape({}),
  })).isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
