import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class Form extends Component {
  state = {
    fieldValue: '',
    errorMsg: ''
  }

  handleChange = event => this.setState({ fieldValue: event.target.value })

  submitFieldValue = event => {
    const { fieldValue } = this.state
    event.preventDefault()
    if (!fieldValue) {
      this.setState({ errorMsg: "O campo precisa estar preenchido" })
      return
    }
    this.props.addTodo(fieldValue)
    this.setState({ errorMsg: "", fieldValue: "" })
  }

  render = () => {
    const { fieldValue, errorMsg } = this.state
    return (
      <div>
        <h3>Adicionar tarefas</h3>
        <div className="group">
          <label className="label">Escreva uma tarefa</label>
          <input className={`input ${!errorMsg ? '' : 'error'}`} onChange={this.handleChange} value={fieldValue} type="text" name="addTodo" />
          <button className="button sm info" onClick={this.submitFieldValue}>
            <FontAwesomeIcon icon={faPlus}/>
          </button>
          {errorMsg && !fieldValue ? <span className="error-msg">{errorMsg}</span> : null}
        </div>
      </div>
    )
  }
}

export default Form