import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { UserContext } from '../utils/context';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(4)
  },
  disabledButton: {
    margin: theme.spacing(4),
    opacity: '0.9',
    cursor: 'not-allowed',
    color: '#111'
  }
}));

const COUNTDOWN_SECONDS = 59;

export default function Countdown() {
  const classes = useStyles();
  const theme = useContext(UserContext);
  const [timing, setTiming] = useState(false);
  const [second, setSecond] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    let interval;
    if (timing) {
      interval = setInterval(() => {
        setSecond(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            theme.handleTimeOut(true);
            clearInterval(interval);
            return COUNTDOWN_SECONDS;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [theme, timing]);

  return (
    <div className="container">
      <Button
        variant="outlined"
        color="primary"
        size="large"
        className={timing ? classes.disabledButton : classes.button}
        onClick={() => {
          theme.handleTimeOut(false);
          setTiming(true);
        }}
      >
        {timing ? `You have ${second} seconds` : 'Play'}
      </Button>
    </div>
  );
}
