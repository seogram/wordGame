import React from 'react';

export const UserContext = React.createContext({
  allowdTime: null,
  randomWords: null,
  answer: null,
  result: {},
  handleTimeOut: () => {},
  dragChange: () => {},
  handlePlay: () => {},
  setLostByTime: () => {},
  checkWrongChar: () => {}
});
export const { Provider } = UserContext;
export const { Consumer } = UserContext;
