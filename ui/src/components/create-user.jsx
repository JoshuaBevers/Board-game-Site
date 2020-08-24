import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { submitUser } from '../api/api-conn';
import { Redirect } from 'react-router-dom';

const CreateFrame = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 30vh;
  box-shadow: 10px 10px 8px 10px #888888;
`;

const UserNameInput = styled.input`
  border-radius: 10px;
  margin-bottom: 5px;
  width: 70vw;
`;
const UserPasswordInput = styled.input`
  border-radius: 10px;
  width: 70vw;
  margin-top: 6px;
`;

const SubmitButton = styled.button`
  color: teal;
`;

function CreateUser() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);
  // const [FirstName, setFirstName] = useState('');
  // const [LastName, setLastName] = useState('');

  const handlesubmit = async () => {
    const SendingData = { Username, Password, Email };
    const response = await submitUser(SendingData);
    //should add a check here to make sure creation is sucessfull. Right now it just redirects no matter what. There is also a huge delay that needs to be investigated.
    setRedirect(true);
  };

  return (
    <>
      <CreateFrame>
        {redirect && <Redirect to='./' />}
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Part of the ship, part of the crew...
          </Header>
          <Form size='large'>
            <Segment stacked>
              <UserNameInput
                placeholder='Username... could be batman'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Segment stacked>
                <UserPasswordInput
                  placeholder='Password'
                  type='password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Segment>
              {/* <Segment stacked>
                <UserPasswordInput
                  placeholder='First Name'
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Segment>
              <Segment stacked>
                <UserPasswordInput
                  placeholder='Last Name'
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Segment>
             */}
            </Segment>
            <Segment stacked>
              <UserPasswordInput
                placeholder='Email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Segment>
            <SubmitButton
              color='teal'
              fluid
              size='large'
              onClick={handlesubmit}
            >
              Join the Crew
            </SubmitButton>
            <Message>
              Already part of the crew?
              <a href='/login'> Ship up</a>
            </Message>
          </Form>
        </Grid.Column>
      </CreateFrame>
    </>
  );
}

export default CreateUser;
