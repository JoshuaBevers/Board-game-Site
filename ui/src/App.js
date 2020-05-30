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
`;

const SearchBar = styled.input`
  color: purple;
  width: 400px;
`;

const CenterArea = styled.div`
  display: flex;
  text-align: center;
  align-content: center;
  align-items: center;
  margin-top: 30vh;
  flex-direction: column;
  font-size: 1.5em;
`;

function App() {
  let results = [];
  const [UInput, setUInput] = useState('');
  const [GameResults, setGameResults] = useState('');

  const GenerateGameList = () => {
    setGameResults(<h1>Hello</h1>);
    // return <h1>Generated</h1>;
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter was pressed');
      GenerateGameList();
    }
  };

  const SearchResults = styled.div`
    color: green;
  `;

  return (
    <AppFrame>
      <Button> login</Button>
      <Button> logout</Button>
      <CenterArea>
        <p>Find Boardgames</p>
        <SearchBar
          type='text'
          value={UInput}
          onChange={(e) => {
            setUInput(e.target.value);
          }}
          onKeyPress={handleSubmit}
          // onInput={(e) => setUInput(e.target.value)}
        />
      </CenterArea>

      {GameResults}
    </AppFrame>
  );
}

export default App;
