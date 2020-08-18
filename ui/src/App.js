import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/game-stub';
import Landing from './components/landing';
import User from './components/profile';

function App() {
  return (
    <Router>
      <Route path='/' component={Landing} exact />
      <Route path='/game/:id' component={GameStub} />
      <Route path='/user/:id' component={User} />
    </Router>
  );
}

export default App;
