import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { API_URL, get } from '../api/api-conn';

function GameStub(props) {
  const enterZone = async () => {
    try {
      const geturl = API_URL + '/api';
      console.log(geturl);
      const response = await get(geturl);
      console.log(response);
    } catch (e) {
      return e;
    }
  };

  return (
    <>
      <p>hello</p>
      <p>{props.value}</p>
      <button onClick={enterZone}> Fetch!</button>
    </>
  );
}

export default GameStub;
