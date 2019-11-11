import React from 'react';

export const UserContext = React.createContext({
  allowdTime: null,
  randomWords: null,
  answer: null,
  result: {},
  handleTimeOut: () => {},
  dragChange: () => {}
});
export const { Provider } = UserContext;
export const { Consumer } = UserContext;
