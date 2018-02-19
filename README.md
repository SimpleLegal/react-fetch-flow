# fetch-flow
An opinionated framework for loading states, data fetching and routing behavior

For react applications utilizing react-router and redux

[Demo](https://darrendahl.github.io/fetch-flow)

### Why

Fetching data on page load in React Single Page Applications is not straightforward. 

You must set loading states, use component lifecycle methods to fetch, while making sure you dont fetch data too often (or not enough) when the user navigates around your application. 

The result is a bug prone implementation that you have to think through a lot to get right (and you shouldn't have to!)

This library solves this problem.

### What

Redux Fetch Flow is a Middleware, Higher Order Component (HOC), and simple Reducer that takes care or setting loading states, client side routing behavior (as it relates to loading), and data fetching. 

It follows a philosophy to make the implementation simple and intuitive for the user. This philosophy is that the user wants the most up to date data as they navigate throughout the application without having to refresh the page, unless they explicitly say so (for instance, the user presses back). So, redux-fetch-flow will fetch data and set loading states whenever they push to browser history, and no other time. 

This philosophy leads to a straightforward implementation that is intuitive to the user.

Use npm or yarn to add:

```yarn add redux-fetch-flow```

```npm install redux-fetch-flow --save```

### How to integrate with React

```javascript
import React from 'react'
import { withRequestFlow } from 'redux-fetch-flow'
import Loading from './Loading'
import { onRequest } from "./api";
 
@withRequestFlow({
  component: <Loading />,
  flag: "todos",
  onRequest
})
class Todo extends React.Component {
  render(){
    return (
      <div>{this.props.todos.map(todo => <h2>todo.name</h2>)}</div>
    )
  }
}

```

### How to integrate with Redux

There are 3 steps in order to get started:

#### 1. Import Middleware

This manages when to set loading states. You will need to set up your request actions to have ```_REQUESTED``` and ```_SUCCESS``` in order for this to work properly. 

```javascript

import { fetchFlowMiddleware } from 'redux-fetch-flow'

const middleware = [fetchFlowMiddleware] //add more if needed=

const store = createStore(
  rootReducer, // new root reducer with router state
  {},          // initialState
  applyMiddleware(...middleware)
)

```

#### 2. Import Reducer

These will contain the loading states used by the HOC

```javascript
import { combineReducers } from 'redux'
import {loadingReducer} from 'redux-fetch-flow'

const rootReducer = combineReducers({
  //...other reducers
  loading: loadingReducer
})

 ```
 
 #### 3. Import Higher Order Component
 
Apply the HOC to your container components that you want to have fetching responsibility, generally the component that your react-router ```<Route />``` component renders.
 
 
 ```javascript
 
 import React from 'react'
 import { withFetchFlow } from 'redux-fetch-flow'
 import * as ACT from 'actions/actionTypes'
 import Loading from './Loading'
 
 @withFetchFlow({
   component: <Loading />, // loading component
   flag: "todo",                  // loading and loaded flag identifiers
   getFetchAction: props => ({ // put action that will be dispatched - follows _REQUESTED / _SUCCESS 
     type: ACT.INIT_TODOS_LIST_REQUESTED,
     payload: {
       todoId: props.match.params.todoId
     }
   })
})
@connect(({todos}) => {
   return {
     todo: todos.currentTodo
   }
})
class Todo extends React.Component {
  render(){
    return (
      <div>{this.props.todo.name}</div>
    )
  }
}
 
```

