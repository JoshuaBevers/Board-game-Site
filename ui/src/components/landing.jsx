import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { API_URL, get } from '../api/api-conn';

import * as QueryResults from '../data/Agricola.json';
import * as Spiderman from '../data/Spiderman.json';

const AppFrame = styled.div`
  font-family: Major Mono Display;
  min-height: 100vh;
  background-color: grey;
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

const SearchButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  margin: 0;
  padding: 0;
  margin-top: -20px;
  margin-left: -640px;
  @media screen and (max-width: 600px) {
    margin-left: -250px;
  }
`;

const ResultList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 0px;
  margin-bottom: -100px;
`;

const SearchResult = styled.div`
  margin-top: -10px;
`;

function Landing() {
  const [UInput, setUInput] = useState('');
  const [GameResults, setGameResults] = useState('');
  const [redirect, setRedirect] = useState(false);

  const GenerateGameList = () => {
    let DatabaseResults = [];
    DatabaseResults.push(QueryResults);
    DatabaseResults.push(Spiderman);

    setGameResults(DatabaseResults);
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter was pressed');
      GenerateGameList();
    } else {
      GenerateGameList();
    }
  };

  const enterZone = async () => {
    setRedirect(true);
  };

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
        />
        <SearchButton onClick={handleSubmit}>Search</SearchButton>
        {GameResults === '' ? <UnderBar>Complete Achievements</UnderBar> : null}
      </CenterArea>
      <ResultList>
        {GameResults.length !== 0
          ? GameResults.map((result, index) => {
              return (
                <SearchResult key={index}>
                  <ul>
                    <h2>
                      {redirect && <Redirect to='/game' />}
                      <button onClick={enterZone} url='#' type='submit'>
                        {result.default.GameName}
                      </button>
                    </h2>
                    <p>{result.default.description}</p>
                  </ul>
                </SearchResult>
              );
            })
          : null}
      </ResultList>
    </AppFrame>
  );
}

export default Landing;
