import React, { useEffect, useState } from 'react';
import Countdown from './components/Countdown';
import DragAndDrop from './dragAndDrop';
import './App.css';
import { HeaderText } from './styles';
import { Provider } from './utils/context';
import shuffle from './utils/shuffle';
import randomIndex from './utils/randomIndex';
import draggableItemMaker from './utils/draggableItemMaker';
import charMatcher from './utils/charMatcher';

export default function App() {
  const [timeExpired, setTimeExpired] = useState(true);
  const [randomWords, setRandomWords] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [selectedChars, setSelectedChars] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  useEffect(() => {
    const wordsPool = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const answersPool = [
      'about',
      'black',
      'cable',
      'chart',
      'daily',
      'draft',
      'funny'
    ];
    const index = randomIndex(wordsPool);
    const currentAnswer = shuffle(answersPool)[randomIndex(answersPool)];
    const currentRandomWords = shuffle([
      ...shuffle(wordsPool).slice(index, index + 1),
      ...currentAnswer.split('')
    ]);
    setAnswer(currentAnswer);
    // console.log(currentAnswer);

    setRandomWords(currentRandomWords);
  }, [timeExpired]);

  useEffect(() => {
    const wordsPool = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const answersPool = [
      'about',
      'black',
      'cable',
      'chart',
      'daily',
      'draft',
      'funny'
    ];
    const index = randomIndex(wordsPool);
    const currentAnswer = shuffle(answersPool)[randomIndex(answersPool)];
    const currentRandomWords = shuffle([
      ...shuffle(wordsPool).slice(index, index + 1),
      ...currentAnswer.split('')
    ]);
    setAnswer(currentAnswer);
    // console.log(currentAnswer);

    setRandomWords(draggableItemMaker(currentRandomWords));
  }, [timeExpired]);

  const dragChange = (chars, str) => {
    console.log('charMatcher', charMatcher(answer, chars));
    setWrongAnswer(charMatcher(answer, chars) ? wrongAnswer : wrongAnswer + 1);
    setSelectedChars(chars);
  };

  const handleTimeOut = value => {
    setTimeExpired(value);
  };

  const appContext = {
    randomWords,
    answer,
    handleTimeOut,
    dragChange
  };

  return (
    <div className="App">
      <Provider value={appContext}>
        <HeaderText>
          Create the word by dragging letter into the empty boxes
        </HeaderText>
        <Countdown />
        {!timeExpired && (
          <>
            <DragAndDrop />
          </>
        )}
      </Provider>
    </div>
  );
}
