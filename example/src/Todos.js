import React, { Component } from "react";
import Loading from "./Loading";
import { withFetchFlow } from "redux-fetch-flow";
import { connect } from "react-redux";
import { compose } from "redux";

const enhance = compose(
  connect(({ app }) => {
    const { todos } = app;
    return {
      todos
    };
  }),
  withFetchFlow({
    component: <Loading />,
    flag: "todo",
    getFetchAction: props => ({
      type: "TODOS_REQUESTED"
      //do something with props if needed
    })
  })
);

class Todos extends Component {
  static defaultProps = {
    todos: []
  };

  render() {
    return this.props.todos.map((todo, i) => {
      return <h2 key={i}>{todo.name}</h2>;
    });
  }
}

export default enhance(Todos);
