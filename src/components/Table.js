import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { deleteItem, editExpense, saveEditedExpense } from '../redux/actions/index';
import '../estilo/table.css';

class Table extends Component {
  state = {
    editingId: null,
    editedDescription: '',
    editedTag: '',
    editedMethod: '',
    editedValue: '',
  };

  editItem = (expense) => {
    const { dispatch } = this.props;
    this.setState({
      editingId: expense.id,
      editedDescription: expense.description,
      editedTag: expense.tag,
      editedMethod: expense.method,
      editedValue: expense.value,
    });
    dispatch(editExpense(expense.id));
  };

  saveEditedItem = () => {
    const { dispatch } = this.props;
    const { editingId, editedDescription,
      editedTag, editedMethod, editedValue } = this.state;
    const editedExpense = {
      id: editingId,
      description: editedDescription,
      tag: editedTag,
      method: editedMethod,
      value: editedValue,
    };
    dispatch(saveEditedExpense(editedExpense));
    this.setState({
      editingId: null,
      editedDescription: '',
      editedTag: '',
      editedMethod: '',
      editedValue: '',
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  removeItem = (id) => {
    const { dispatch, expenses } = this.props;
    const deleteExpense = expenses.filter((e) => e.id !== id);
    dispatch(deleteItem(deleteExpense));
  };

  render() {
    const { expenses } = this.props;
    const { editingId, editedDescription,
      editedTag, editedMethod, editedValue } = this.state;

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
            {expenses.length > 0 && expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency]?.name}</td>
                <td>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(expense.exchangeRates[expense.currency]?.ask)}
                </td>
                <td>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(
                    Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency]?.ask),
                  )}
                </td>
                <td>Real Brasileiro</td>
                <td>
                  {editingId === expense.id ? (
                    <div className="button-group">
                      <button
                        type="button"
                        data-testid="save-btn"
                        onClick={ this.saveEditedItem }
                      >
                        <FaSave />
                      </button>
                      <button
                        data-testid="cancel-btn"
                        type="button"
                        onClick={ () => this.setState({
                          editingId: null,
                          editedDescription: '',
                          editedTag: '',
                          editedMethod: '',
                          editedValue: '',
                        }) }
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="button-group">
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => this.editItem(expense) }
                      >
                        <FaEdit />
                      </button>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        id="Excluir"
                        onClick={ () => this.removeItem(expense.id) }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingId && (
          <div>
            <input
              type="text"
              name="editedDescription"
              value={ editedDescription }
              onChange={ this.handleInputChange }
              placeholder="Descrição"
            />
            <input
              type="text"
              name="editedTag"
              value={ editedTag }
              onChange={ this.handleInputChange }
              placeholder="Tag"
            />
            <input
              type="text"
              name="editedMethod"
              value={ editedMethod }
              onChange={ this.handleInputChange }
              placeholder="Método de pagamento"
            />
            <input
              type="text"
              name="editedValue"
              value={ editedValue }
              onChange={ this.handleInputChange }
              placeholder="Valor"
            />
          </div>
        )}
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangesRates: PropTypes.shape({}),
    }),
  ).isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
