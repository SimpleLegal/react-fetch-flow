import React, { Component } from 'react';
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Todos from './Todos'
import Invoices from './Invoices'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <main>
            <header className="App-header">
              <Link to="/todos">Todos</Link>
              <Link to="/invoices">Invoices</Link>
            </header>
            <Switch>
              <Route path="/todos" component={Todos}/>
              <Route path="/invoices" component={Invoices}/>
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
