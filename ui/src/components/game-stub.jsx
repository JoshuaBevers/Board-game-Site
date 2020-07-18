import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getGame } from '../api/api-conn';

const AppFrame = styled.div`
  font-family: Major Mono Display;
  min-height: 100vh;
  background-color: grey;
`;

const Title = styled.div`
  @media screen and (max-width: 600px) {
    text-align: center;
    font-size: 50px;
    -webkit-text-stroke: 0.7px red;
  }
`;

function GameStub() {
  const [SelectedGame, setSelectedGame] = useState('');

  const cleanGame = (game) => {
    let GameTitle = game;
    if (game.includes('%20')) {
      const splitGame = game.split('%20');

      if (splitGame.length >= 2) {
        GameTitle = splitGame.join(' ');
      }
    }
    return GameTitle;
  };

  const decodeURL = () => {
    const url = window.location.href;
    const urlParam = url.split('/');
    const uncleanGame = urlParam.pop();
    const CleanGame = cleanGame(uncleanGame);

    return CleanGame;
  };

  useEffect(() => {
    async function fetchGame(gameName) {
      const game = await getGame(gameName);
      setSelectedGame(game[0]);
      return game;
    }
    const gameIS = decodeURL();
    fetchGame(gameIS);
  }, []);

  return (
    <AppFrame>
      <Title>
        {SelectedGame !== '' ? (
          <div>{SelectedGame.name}</div>
        ) : (
          <p>Loading...</p>
        )}
      </Title>
    </AppFrame>
  );
}

export default GameStub;
