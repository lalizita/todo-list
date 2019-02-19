import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons'
import './App.css';

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
          <input className="input" onChange={this.handleChange} value={fieldValue} type="text" name="addTodo" />
          <button className="button sm info" onClick={this.submitFieldValue}>
            <FontAwesomeIcon icon={faPlus}/>
          </button>
          {errorMsg ? <span>{errorMsg}</span> : null}
        </div>
      </div>
    )
  }
}

class List extends Component {
  renderList = () => {
    const { actions, list } = this.props
    return(
      list.map((element, index) => (
        <div className="todo-item" key={index}>
          <div className="item">
          {element}
          </div>
          {actions ? (
            <div className="actions">
              {actions(index)}
            </div>
          ): null}
        </div>
      ))
    )
  }

  render = () => {
    const { list } = this.props
    return (
      <div className="todo-list">
        {list && list.length > 0 ? this.renderList() : null}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: [],
      done: []
    }
  }

  addTodoItem = item => {
    const { todo } = this.state
    this.setState({ todo: [...todo, item] })
  }


  removeTodoItem = index => {
    const {todo} = this.state
    const newTodoList = todo.filter((item, i) => {
      if(i !== index) return item[i]
    })
    this.setState({todo:newTodoList})
  }

  moveToDone = index => {
    const {todo, done} = this.state
    const doneItem = todo[index]
    const newTodoList = todo.filter((item, i) => {
      if(i !== index) return item[i]
    })
    this.setState({todo:newTodoList, done:[...done, doneItem]})
  }

  todoActions = item => {
    return(
      <div>
        <button className="button text-danger" onClick={() => this.removeTodoItem(item)}>
          <FontAwesomeIcon icon={faWindowClose}/>
        </button>
        <button className="button text-info" onClick={() => this.moveToDone(item)}>
          <FontAwesomeIcon icon={faCheck}/>
        </button>
      </div>
    )
  }

  render() {
    const { todo, done } = this.state

    return (
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <Form addTodo={this.addTodoItem} />
            <List list={todo} actions={this.todoActions}/>
          </Col>
          <Col sm={12} md={6}>
            <h3>Tarefas Concluídas <span className="text-success">
            <FontAwesomeIcon icon={faCheck}/>
            </span></h3>
            <div className="spacer"></div>
            <List list={done} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
