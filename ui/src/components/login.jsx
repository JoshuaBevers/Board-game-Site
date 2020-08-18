import React, { useState } from 'react';
import { getUser } from '../api/api-conn';
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

  const handlesubmit = async () => {
    console.log('Hello!');
    console.log(Username);
    console.log(UserPassword);
    const response = await getUser(Username, UserPassword);
    console.log(response);
  };

  return (
    <>
      <LoginFrame>
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
    </>
  );
}
export default LoginForm;
