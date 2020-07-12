import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_URL, get } from '../api/api-conn';

function GameStub(props) {
  useEffect(() => {});

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
      <p>props: {props.data}</p>
      <button onClick={enterZone}> Fetch!</button>
    </>
  );
}

export default GameStub;
