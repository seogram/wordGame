import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../utils/context';
import { Second } from '../styles';

export default function Countdown() {
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
            theme.setLostByTime(true);
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

  useEffect(() => {
    setTiming(true);
    setSecond(theme.allowdTime);
  }, [theme.allowdTime, theme.playClicked]);
  return (
    <div className="container">
      {timing && !theme.timeExpired && (
        <Second timing={timing}>{second} </Second>
      )}
    </div>
  );
}
