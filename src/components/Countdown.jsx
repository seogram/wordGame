import React, { useEffect, useState } from 'react';

const COUNTDOWN_SECONDS = 59;

export default function Countdown() {
  const [timing, setTiming] = useState(false);
  const [second, setSecond] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    let interval;
    if (timing) {
      interval = setInterval(() => {
        setSecond(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            return COUNTDOWN_SECONDS;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  return (
    <div className="container">
      <button type="button" disabled={timing} onClick={() => setTiming(true)}>
        {timing ? `Timing ${second}` : 'Go'}
      </button>
    </div>
  );
}
