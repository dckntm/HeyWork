import React from 'react';

import {
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom"

import './App.css';
import Homepage from './components/homepage';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={ Homepage }>

            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
