import React from 'react';

import {
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom"

import './App.css';
import Homepage from './components/homepage';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={ Homepage }>

            </Route>

            <Route path="/login" component={ Login }>
            </Route>

            <Route path="/register" component={ Register }>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
