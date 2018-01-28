# redux-fetch-flow
An opinionated framework for loading states, data fetching and routing behavior

For react applications utilizing react-router and redux

[Demo](https://darrendahl.github.io/fetch-flow)

### Why

Fetching data on page load in react applications is not straightforward. You have to set loading states, use component lifecycle methods to fetch, while making sure you dont fetch data too often (or not enough) when your user navigates around your application. The result is bug prone code that you have to think through a lot to get right (and you shouldn't have to!)

This library solves this problem.

### Introduction

React applications that asynchronusly fetch data from a server have common problems with not so obvious solutions:

1. How do I fetch initial data for a given page in my application?

2. How do I set loading states? How can I avoid putting isLoading and dataLoaded flags everywhere?

3. How do I avoid infinite loops on componentDidMount?

4. How does browser navigation interact with data fetching?

5. How can I have a consistent, intuitive experience for the user when navigating my application?

Redux Fetch Flow is a Middleware, Higher Order Component (HOC), and simple Reducer that takes care or setting loading states, client side routing behavior (as it relates to loading), and data fetching. 

There are 3 steps in order to get started:

### 1. Import Middleware

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

### 2. Import Reducer

These will contain the loading states used by the HOC

```javascript
import { combineReducers } from 'redux'
import {loadingReducer} from 'redux-fetch-flow'

const rootReducer = combineReducers({
  //...other reducers
  loading: loadingReducer
})

 ```
 
 ### 3. Import Higher Order Component
 
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

