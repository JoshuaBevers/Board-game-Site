import React, { useState } from 'react';
import GameStub from './components/game-stub';
import Landing from './components/landing';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path='/' component={Landing} exact />
      <Route path='/game/' component={GameStub} />
    </Router>
  );
}

export default App;
