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

export default function Countdown() {
  const classes = useStyles();
  const theme = useContext(UserContext);
  const [timing, setTiming] = useState(false);
  const [second, setSecond] = useState(theme.allowdTime);

  useEffect(() => {
    let interval;
    if (timing && !theme.timeExpired) {
      interval = setInterval(() => {
        setSecond(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            theme.setTimeExpired(true);
            clearInterval(interval);
            return theme.allowdTime;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    if (theme.timeExpired) {
      setTiming(false);
      setSecond(0);
    }
    return () => clearInterval(interval);
  }, [theme, timing]);

  return (
    <div className="container">
      <Button
        variant="outlined"
        color="primary"
        size="large"
        className={
          timing && !theme.timeExpired ? classes.disabledButton : classes.button
        }
        onClick={() => {
          setTiming(true);
          setSecond(theme.allowdTime);
          theme.setTimeExpired(false);
          theme.setCorrectAnswer(false);
        }}
      >
        {timing && !theme.timeExpired ? `You have ${second} seconds` : 'Play'}
      </Button>
    </div>
  );
}
