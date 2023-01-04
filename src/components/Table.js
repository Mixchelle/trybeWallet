import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, editExpense } from '../redux/actions/index';

class Table extends Component {
  bttDeleteIten = (id) => {
    const { expenses, dispatch } = this.props;
    const idExcluir = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteItem(idExcluir));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
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
          <tbody>
            {expenses.length
            && expenses.map((expense) => (
              <tr key={ expense.id }>
                <th>
                  {expense.description}
                </th>
                <th>{expense.tag}</th>
                <th>{expense.method}</th>
                <th>{Number(expense.value).toFixed(2)}</th>
                <th>
                  {expense.exchangeRates[expense.currency]?.name}
                </th>
                <th>
                  {
                    new Intl
                      .NumberFormat('en-US', { style: 'currency', currency: 'BRL' })
                      .format(expense.exchangeRates[expense.currency]?.ask)
                  }

                </th>
                <th>
                  {
                    new Intl
                      .NumberFormat('en-US', { style: 'currency', currency: 'BRL' })
                      .format(Number(expense.value)
                      * Number(expense.exchangeRates[expense.currency]?.ask))
                  }

                </th>
                <th>Real Brasileiro</th>
                <th>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => dispatch(editExpense(expense)) }
                  >
                    Editar despesa
                  </button>

                  <button
                    data-testid="delete-btn"
                    type="button"
                    id="Excluir"
                    onClick={ () => this.bttDeleteIten(expense.id) }
                  >
                    Excluir
                  </button>
                </th>
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
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
