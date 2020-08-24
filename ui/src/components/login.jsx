import React, { useState } from 'react';
import { getUser } from '../api/api-conn';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

const LoginFrame = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 30vh;
  box-shadow: 10px 10px 8px 10px #888888;
`;

const UserNameInput = styled.input`
  border-radius: 10px;
  margin-bottom: 5px;
`;
const UserPasswordInput = styled.input`
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  color: teal;
`;

function LoginForm() {
  const [Username, setUsername] = useState(``);
  const [UserPassword, setUserPassword] = useState(``);
  const [redirect, setRedirect] = useState(false);

  const handlesubmit = async () => {
    console.log('Hello from the handlesubmit!');
    console.log(Username);
    console.log(UserPassword);
    const data = { Username, UserPassword };
    console.log(' Data object being sent is: ', data);
    const response = await getUser(data);

    //create local data
    const setLocalData = (localKey, localValue) => {
      const currentDate = new Date();
      const item = {
        localValue,
        expiry: currentDate.getTime() + 86400000,
      };
      localStorage.setItem(localKey, JSON.stringify(item));
    };
    setLocalData('userName', Username);
    setRedirect(true);
  };

  return (
    <LoginFrame>
      {redirect && <Redirect to='./' />}
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <UserNameInput
              placeholder='E-mail address'
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Segment stacked>
              <UserPasswordInput
                placeholder='Password'
                type='password'
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </Segment>
            <SubmitButton
              color='teal'
              fluid
              size='large'
              onClick={handlesubmit}
            >
              Login
            </SubmitButton>
          </Segment>
        </Form>
        <Message>
          New to the site?
          <a href='/create'>Join the crew</a>
        </Message>
      </Grid.Column>
    </LoginFrame>
  );
}
export default LoginForm;
