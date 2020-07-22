import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getList } from '../api/api-conn';

const AppFrame = styled.div`
  font-family: Major Mono Display;
  min-height: 100vh;
  background-color: lightgrey;
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
  font-size: 40px;
  -webkit-text-stroke: 0.7px red;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const SearchButton = styled.button`
  background-color: white;
  border-radius: 10px;
  font-size: 20px;
  margin-bottom: 40px;
  margin-top: 30px;

  @media screen and (max-width: 600px) {
    /* margin-left: -250px; */
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

  const GenerateGameList = async () => {
    let DatabaseResults = [];
    const SearchResults = await getList(UInput);

    SearchResults.forEach((game) => {
      DatabaseResults.push(game);
    });

    setGameResults(DatabaseResults);
  };

  const handleSearch = (e) => {
    GenerateGameList();
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

        {GameResults === '' ? <UnderBar>Complete Achievements</UnderBar> : null}
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </CenterArea>
      <ResultList>
        {GameResults.length !== 0
          ? GameResults.map((game, index) => {
              return (
                <SearchResult key={game.name}>
                  <Link to={`/game/${game.name}`}>
                    <ul>
                      <h2>{game.name}</h2>

                      <p>{game.description}</p>
                    </ul>
                  </Link>
                </SearchResult>
              );
            })
          : null}
      </ResultList>
    </AppFrame>
  );
}

export default Landing;
