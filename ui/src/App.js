import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/game-stub';
import Landing from './components/landing';
import User from './components/profile';
import Login from './components/login';
import CreateUser from './components/create-user';
import Profile from './components/profile';

const NavBar = styled.div`
  display: flex;
  background-color: black;
  color: white;
  height: 30px;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100px;
  background-color: orange;
  border-color: orange;
`;

const Title = styled.div`
  font-size: 20px;
`;

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const getLocalData = (localKey) => {
    const itemStr = localStorage.getItem(localKey);
    if (!itemStr) {
      return '';
    }
    const item = JSON.parse(itemStr);
    const currentDate = new Date();
    if (currentDate.getTime() > item.expiry) {
      localStorage.removeItem(localKey);
      return '';
    }
    return item.localValue;
  };

  const setLocalData = (localKey, localValue) => {
    const currentDate = new Date();
    const item = {
      localValue,
      expiry: currentDate.getTime() + 86400000,
    };
    localStorage.setItem(localKey, JSON.stringify(item));
  };

  const logOutButton = () => {
    //the set Local Data needs to be removed or set to null for log out.
    setLocalData('username', null);
    setLocalData('userID', null);
    setLocalData('achievements', null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const user = getLocalData('userID');
    if (user !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <NavBar>
        <Title>Achieveland</Title>
        {IsLoggedIn === false ? (
          <a href='/login'>
            <Button>Log In</Button>
          </a>
        ) : (
          <a>
            <Button onClick={logOutButton}>Log Out</Button>
          </a>
        )}
      </NavBar>

      <Router>
        <Route path='/' component={Landing} exact />
        <Route path='/game/:id' component={GameStub} />
        <Route path='/user/:id' component={User} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/create' component={CreateUser} />
        <Route exact path='/profile' component={Profile} />
      </Router>
    </>
  );
}

export default App;
