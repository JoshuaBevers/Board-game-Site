import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import { getGame } from '../api/api-conn';

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

  const testingButton = () => {
    console.log(SelectedGame);
  };

  return (
    <>
      <p>hello</p>
      <>
        props:{' '}
        {SelectedGame !== '' ? (
          <>
            <p>there is something there</p> {SelectedGame.name}
            <button onClick={testingButton}> check the state</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </>
    </>
  );
}

export default GameStub;
