import React, { useState } from 'react';
import styled from 'styled-components';

const AppFrame = styled.div`
  font-family: Major Mono Display;
  min-height: 100vh;
  background-color: grey;
`;

const Button = styled.button`
  color: orange;
  background-color: transparent;
  border-color: transparent;
  justify-content: center;
`;

const SearchBar = styled.input`
  color: purple;
  width: 700px;
  text-align: center;
  border-radius: 15px;
  margin-top: -25px;
  height: 1.4em;
  border-color: red;

  @media screen and (max-width: 600px) {
    width: 310px;
  }
`;

const CenterArea = styled.div`
  display: flex;
  text-align: center;
  align-content: center;
  align-items: center;
  margin-top: 30vh;
  flex-direction: column;
  font-size: 3.4em;

  @media screen and (max-width: 600px) {
    font-size: 2em;
    margin-top: 0px;
  }
`;

const UnderBar = styled.p`
  font-size: 23px;
  margin-top: 10px;
  -webkit-text-stroke: 0.4px blue;
  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
`;

const InputTitle = styled.p`
  -webkit-text-stroke: 0.7px red;
`;

function App() {
  const [UInput, setUInput] = useState('');
  const [GameResults, setGameResults] = useState('');
  const GenerateGameList = () => {
    setGameResults(<h1>Hello</h1>);
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter was pressed');
      GenerateGameList();
    }
  };

  const SearchButton = styled.button`
    background-color: transparent;
    border-color: transparent;
    border-radius: transparent;
    margin-top: -20px;
    margin-left: 640px;
    @media screen and (max-width: 600px) {
      margin-left: 250px;
    }
  `;

  const SearchResults = styled.div``;

  return (
    <AppFrame>
      Achieveland
      <CenterArea>
        <InputTitle>Find Boardgames</InputTitle>
        <SearchBar
          type='search'
          results='5'
          name='s'
          value={UInput}
          onChange={(e) => {
            setUInput(e.target.value);
          }}
          onKeyPress={handleSubmit}
          // onInput={(e) => setUInput(e.target.value)}
        />
        <SearchButton>Search</SearchButton>
        {GameResults === '' ? <UnderBar>Complete Achievements</UnderBar> : null}
      </CenterArea>
      <SearchResults>{GameResults}</SearchResults>
    </AppFrame>
  );
}

export default App;
