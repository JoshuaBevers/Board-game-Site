import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getGame, submitAchievement } from '../api/api-conn';
import { Button, Card } from 'react-bootstrap';

const AppFrame = styled.div`
  font-family: Major Mono Display;
  min-height: 100vh;
  background-color: lightgrey;
`;

const Title = styled.div`
  @media screen and (max-width: 600px) {
    text-align: center;
    font-size: 75px;
    -webkit-text-stroke: 0.7px red;
  }
`;

const AchievementList = styled.div`
  display: flex;
  text-align: center;
  font-size: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const AchievementCard = styled.div`
  width: 95vw;
  margin-top: 20px;
  border-color: orange;
  border-radius: 10px;
  box-shadow: 10px 10px 8px 10px #888888;
`;

function GameStub() {
  const [SelectedGame, setSelectedGame] = useState('');
  const [UserAchievements, setUserAchievements] = useState('');
  const [CurrentGameAchievement, setCurrentGameachievement] = useState('');

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
    setUserAchievements(getLocalData('achievements'));

    //game setting
    const tAchieve = getLocalData('achievements');
    console.log(SelectedGame);
    const cGame = tAchieve.forEach((game) => {
      console.log('hello');
      if (game.id === SelectedGame.id) {
        console.log(game);
        console.log(SelectedGame);
        return game;
      }
    });
    console.log(cGame);
  }, []);

  const claimAchievement = async (achievement) => {
    //arange data
    console.log(SelectedGame);
    const user = {
      username: getLocalData('username'),
      userID: getLocalData('userID'),
    };
    console.log('user is: ', user);

    //claim the achievement
    //future improvement: write it to where the button changes until the submitAchievement reports back a sucessful post. Prevents hanging the site.
    await submitAchievement(SelectedGame, achievement, user);
  };

  const getLocalData = (localKey) => {
    const itemStr = localStorage.getItem(localKey);
    if (!itemStr) {
      return '';
    }
    const item = JSON.parse(itemStr);
    const currentDate = new Date();
    if (currentDate.getTime() > item.expiry) {
      localStorage.removeItem(localKey);
      return '';
    }
    return item.localValue;
  };

  const seeLocalData = () => {
    console.log(UserAchievements);
    console.log(getLocalData('achievements'));
  };

  return (
    <AppFrame>
      <Title>
        {SelectedGame !== '' ? (
          <div>{SelectedGame.name}</div>
        ) : (
          <p>Loading...</p>
        )}
      </Title>
      <AchievementList>
        {SelectedGame !== ''
          ? SelectedGame.achievements.map((achiev) => {
              return (
                <AchievementCard key={achiev.id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{achiev.name}</Card.Title>
                      <Card.Text>{achiev.description}</Card.Text>
                      <Button
                        // variant='primary'
                        className='ui toggle button'
                        aria-pressed='false'
                        onClick={() => {
                          claimAchievement(achiev);
                        }}
                      >
                        Claim Achievement
                      </Button>
                      <Button onClick={seeLocalData}> check local data</Button>
                    </Card.Body>
                  </Card>
                </AchievementCard>
              );
            })
          : null}
      </AchievementList>
    </AppFrame>
  );
}

export default GameStub;
