import React, { useState } from 'react';
import GameStub from './components/game-stub';
import Landing from './components/landing';
import Modal from './components/modal';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path='/' component={Landing} exact />
      <Route path='/game/:id' component={GameStub} />
      {/* <Route path='/modal' component={Modal} /> */}
    </Router>
  );
}

export default App;
