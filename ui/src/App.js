import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/game-stub';
import Landing from './components/landing';
import User from './components/profile';
import Login from './components/login';
import CreateUser from './components/create-user';

function App() {
  return (
    <Router>
      <Route path='/' component={Landing} exact />
      <Route path='/game/:id' component={GameStub} />
      <Route path='/user/:id' component={User} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/create' component={CreateUser} />
    </Router>
  );
}

export default App;
