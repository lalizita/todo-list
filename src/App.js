import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import List from './components/List'
import Form from './components/Form'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: [],
      done: [],
      successMsg:'',
      alertVisible:false
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
    this.showSuccessMessage('Tarefa removida')
  }

  moveToDone = index => {
    const {todo, done} = this.state
    const doneItem = todo[index]
    const newTodoList = todo.filter((item, i) => {
      if(i !== index) return item[i]
    })
    this.setState({todo:newTodoList, done:[...done, doneItem]})
    this.showSuccessMessage('Tarefa concluída')
  }

  showSuccessMessage = msg => {
    this.setState({successMsg:msg, alertVisible:true}, () => {
      setTimeout(() => {
        this.setState({successMsg:'', alertVisible:false})
      }, 3000)
    })
  }

  todoActions = item => {
    return(
      <div>
        <button className="button text-danger" onClick={() => this.removeTodoItem(item)}>
          <FontAwesomeIcon icon={faTimes}/>
        </button>
        <button className="button text-info" onClick={() => this.moveToDone(item)}>
          <FontAwesomeIcon icon={faCheck}/>
        </button>
      </div>
    )
  }

  render() {
    const { todo, done, successMsg, alertVisible } = this.state

    return (
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <Form addTodo={this.addTodoItem} />
            {alertVisible ? <Alert color="success">{successMsg}</Alert> : null}
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
