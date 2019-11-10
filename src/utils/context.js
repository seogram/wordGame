import React from 'react';

export const UserContext = React.createContext({
  randomWords: null,
  answer: null,
  handleTimeOut: () => {},
  dragChange: () => {}
});
export const { Provider } = UserContext;
export const { Consumer } = UserContext;
