import React, { useContext } from 'react';
import { Button } from '../../styles';
import { UserContext } from '../../utils/context';

export default function PlayButton() {
  const theme = useContext(UserContext);
  return (
    <div className='container'>
      <Button
        data-test='play-btn'
        type='button'
        timeExpired={theme.timeExpired}
        onClick={() => {
          theme.handlePlay();
          theme.setTimeExpired(false);
          theme.setCorrectAnswer(false);
        }}
      >
        Play
      </Button>
    </div>
  );
}
