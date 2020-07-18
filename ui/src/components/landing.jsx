import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getList } from '../api/api-conn';

import Modal from './modal';

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

const SearchResult = styled.form`
  margin-top: -10px;
`;

function Landing() {
  const [UInput, setUInput] = useState('');
  const [GameResults, setGameResults] = useState('');
  const [state, setState] = useState({
    showModal: false,
  });

  const GenerateGameList = async () => {
    let DatabaseResults = [];
    console.log('UI input is: ', UInput);
    const SearchResults = await getList(UInput);
    console.log('Search results returned: ', SearchResults);

    SearchResults.forEach((game) => {
      DatabaseResults.push(game);
      console.log('Iteration', game.name);
    });

    console.log(DatabaseResults);
    setGameResults(DatabaseResults);
  };

  const handleClose = () => {
    setState({ gameSelected: undefined });
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      GenerateGameList();
    }
  };

  return (
    <AppFrame>
      Achieveland
      <CenterArea>
        {state.gameSelected && (
          <Modal game={state.gameSelected} closeModal={handleClose} />
        )}
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
          ? GameResults.map((game, index) => {
              return (
                <Link to={`/game/${game.name}`}>
                  <SearchResult key={game.id}>
                    <ul>
                      <h2>{game.name}</h2>

                      <p>{game.description}</p>
                    </ul>
                  </SearchResult>
                </Link>
              );
            })
          : null}
      </ResultList>
    </AppFrame>
  );
}

export default Landing;
