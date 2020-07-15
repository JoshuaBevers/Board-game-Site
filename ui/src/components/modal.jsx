import React from 'react';
import Styled from 'styled-components';

const ModalOverlay = Styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100vh;
  background: rgba(0,0,0,0.1);
  width: 100vw;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ModalContent = Styled.div`
  color: black;
  background: grey;
  border: solid 1px black;
  margin: auto;
  width: 90vw;
  min-height: 80vh;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 20px;
  position: fixed;
  border-radius: 100px;
`;

const Title = Styled.div`
    justify-content: center;
    text-align: center;
    font-size: 24px;
    text-wrap: wrap;

`;

const Modal = (props) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <button onClick={props.closeModal}>Close</button>
        <Title>{props.game.name}</Title>
        {props.game.id}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
