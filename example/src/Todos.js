import React, { Component } from 'react'
import Loading from './Loading'
import {withFetchFlow} from 'redux-fetch-flow'
import { connect } from 'react-redux'
import { compose } from 'redux'


const enhance = compose(
  connect(({ app }) => {
    const { todos } = app.todos
    return {
      todos
    }
  }),
  withFetchFlow({
    component: <Loading />,
    ref: 'todo',
    getFetchAction: props => ({
      type: "TODOS_REQUESTED"
      //do something with props if needed
    })
  })
)

class Todos extends Component {
  render(){
    return this.props.todos.map(todo => {
      <div>{todo.name}</div>
    })
  }
}

export default enhance(Todos)