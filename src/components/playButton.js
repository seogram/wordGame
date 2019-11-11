import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { UserContext } from '../utils/context';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(4)
  },
  hidden: {
    opacity: '0'
  }
}));

export default function PlayButton() {
  const classes = useStyles();
  const theme = useContext(UserContext);

  return (
    <div className="container">
      <Button
        variant="outlined"
        color="primary"
        size="large"
        className={!theme.timeExpired ? classes.hidden : classes.button}
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
