import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
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
        <h3>Todo List</h3>
        <div className="input-group">
          <input className="input" onChange={this.handleChange} value={fieldValue} type="text" name="addTodo" />
          <Button color="success" onClick={this.submitFieldValue}>Add Todo</Button>
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

  todoActions = () => {
    return (
      <div>
        <Button color="danger">X</Button>
        <Button color="info">V</Button>
      </div>
    )
  }

  removeTodoItem = item => {
    const {todo} = this.state
  }

  todoActions = item => {
    return(
      <div>
        <Button color="danger" onClick={() => this.removeTodoItem(item)}>Remover</Button>
        <Button color="info">Concluir</Button>
      </div>
    )
  }

  render() {
    const { todo } = this.state

    return (
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <Form addTodo={this.addTodoItem} />
            <List list={todo} actions={this.todoActions}/>
          </Col>
          <Col sm={12} md={6}>
            <List />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
