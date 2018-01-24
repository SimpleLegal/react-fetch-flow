import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {withFetchFlow} from 'redux-fetch-flow'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Todos from './Todos'
import Invoices from './Invoices'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Link to="/todos">Todos</Link>
            <Link to="/invoices">Invoices</Link>
          </header>
          <p className="App-intro">
            <Switch>
              <Route path="/todos" component={Todos}/>
              <Route path="/invoices" component={Invoices}/>
            </Switch>
          </p>
        </Router>
      </div>
    );
  }
}

export default App;
