import React, { Component } from 'react';

class List extends Component {
  renderList = () => {
    const { actions, list } = this.props
    return (
      list.map((element, index) => (
        <div className="todo-item" key={index}>
          <div className="item">
            {element}
          </div>
          {actions ? (
            <div className="actions">
              {actions(index)}
            </div>
          ) : null}
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

export default List