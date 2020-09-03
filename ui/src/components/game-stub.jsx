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
  const [CurrentGameAchievement, setCurrentGameAchievement] = useState([]);

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
    setUserAchievements(getLocalData('achievements'));

    async function fetchGame(gameName) {
      const game = await getGame(gameName);
      setSelectedGame(game[0]);
      console.log(
        'About to send: ',
        game,
        ' to verify current games out of achievements.',
      );
      const setGame = await CurrentUserGameAchievements(game[0]);
      return game;
    }

    async function CurrentUserGameAchievements(currentGame) {
      //setting workable data.
      console.log('receieved game is: ', currentGame);
      const UserAchievements = getLocalData('achievements');
      console.log('user achievements are: ', UserAchievements);

      //parse workable data.
      let test = [];
      if (UserAchievements !== undefined) {
        UserAchievements.forEach((game) => {
          console.log('we are peeking at User Achivement Game: ', game);
          if (game.game_no === currentGame.id) {
            console.log('we have a match.');
            test.push(game);
            console.log('the match is: ', game);
            return game;
          }
        });
        console.log('finished prodouct', test);
        setCurrentGameAchievement(test);
      }
    }

    const gameIS = decodeURL();
    fetchGame(gameIS);

    //game setting
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

    console.log('game achievements are: ', CurrentGameAchievement);
  };

  const RenderTest = (props) => {
    // const playerHasAchievement = CurrentGameAchievement.find((x) => {
    //   return x.id === props.achievement.id;
    // });
    for (const a of CurrentGameAchievement) {
      if (a.id === props.achievement.id) {
        //return button
      }
    }
    //return other button.

    //get current achivements claimed in this game by the user.
    console.log('dfosdif', CurrentGameAchievement.length);
    console.log(
      CurrentGameAchievement.length,
      SelectedGame.achievements.length,
    );
    if (CurrentGameAchievement.length === SelectedGame.achievements.length) {
      console.log('You have done it all!');
      return (
        <h1>
          You've completed them all! please install an remove achievement
          button.
        </h1>
      );
    }
    if (CurrentGameAchievement.length === 0) {
      let display = SelectedGame.achievements.map((achieve) => {
        if (achieve.id !== props.achievement.id) {
          console.log('hello!', props.achievement.id, achieve.achievement_no);
          return (
            <Button
              className='ui toggle button'
              aria-pressed='false'
              onClick={() => {
                claimAchievement(props.achievement);
              }}
            >
              Claim Achievement
            </Button>
          );
        }
      });
      return display;
    }
    if (CurrentGameAchievement.length >= 1) {
      let display = CurrentGameAchievement.map((achieve) => {
        console.log('primary achieve at the base is: ', achieve);

        if (achieve.achievement_no !== props.achievement.id) {
          console.log('hello!', props.achievement.id);
          return (
            <Button
              // variant='primary'
              className='ui toggle button'
              aria-pressed='false'
              onClick={() => {
                claimAchievement(props.achievement);
              }}
            >
              Claim Achievement
            </Button>
          );
        } else {
          return <h1> already claimed</h1>;
        }
      });

      console.log(CurrentGameAchievement);
      return display;
    }
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
                      {/* conditional rendering? */}
                      {CurrentGameAchievement !== [] ? (
                        <RenderTest achievement={achiev} />
                      ) : null}
                      {/* end conditional  rendering */}

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
