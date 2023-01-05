import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, editExpense } from '../redux/actions/index';

class Table extends Component {
  removeItem = (id) => {
    const { dispatch, expenses } = this.props;
    const deleteExpense = expenses.filter((e) => e.id !== id);
    dispatch(deleteItem(deleteExpense));
    console.log({ expenses }, 'remove');
  };

  editItem = (id) => {
    const { dispatch, expenses } = this.props;
    dispatch(editExpense(id));
    console.log({ expenses },'edita');
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr
              className="tableHeader"
              sx={ { minWidth: 650 } }
              aria-label="simple table"
            >
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
            && expenses.map((expense, id) => (
              <tr
                key={ id }
                sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
              >
                <th>
                  {expense.description}
                </th>
                <th>{expense.tag}</th>
                <th>{expense.method}</th>
                <td>{parseFloat(expense.value).toFixed(2)}</td>
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
                    onClick={ () => this.editItem(id)  }
                  >
                    Editar despesa
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    id="Excluir"
                    onClick={ () => this.removeItem(expenses.id) }
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

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
