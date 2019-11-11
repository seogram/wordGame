import React, { useEffect, useState } from 'react';
import Countdown from './components/Countdown';
import DragAndDrop from './dragAndDrop';
import PlayButton from './components/playButton';
import { Header, SubHeader } from './styles';
import { Provider } from './utils/context';
import shuffle from './utils/shuffle';
import randomIndex from './utils/randomIndex';
import draggableItemMaker from './utils/draggableItemMaker';
import charMatcher from './utils/charMatcher';
import calculateWrongAnswer from './utils/calculateWrongAnswer';
import isAnswerCorrect from './utils/isAnswerCorrect';
import './App.css';

export default function App() {
  const [timeExpired, setTimeExpired] = useState(true);
  const [randomWords, setRandomWords] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  // const [selectedChars, setSelectedChars] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [result, setResult] = useState({});
  const [allowdTime] = useState(30);
  const [playClicked, setPlayClicked] = useState(false);

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
      ...shuffle(wordsPool).slice(index, index + 4),
      ...currentAnswer.split('')
    ]);
    setAnswer(currentAnswer);
    setRandomWords(draggableItemMaker(currentRandomWords));
  }, [timeExpired]);

  useEffect(() => {
    if (wrongAnswer === 3) {
      setTimeExpired(true);
    }
  }, [wrongAnswer]);

  const dragChange = chars => {
    const currentResult = charMatcher(answer, chars);
    if (isAnswerCorrect(currentResult, answer)) {
      setCorrectAnswer(true);
      setTimeExpired(true);
    }
    setResult(currentResult);
    setWrongAnswer(calculateWrongAnswer(currentResult));
    // setSelectedChars(chars);
  };

  const handlePlay = () => {
    setPlayClicked(!playClicked);
    setWrongAnswer(0);
    setResult({});
    setCorrectAnswer(false);
    setTimeExpired(true);
    setRandomWords([]);
  };

  const appContext = {
    allowdTime,
    timeExpired,
    randomWords,
    answer,
    handlePlay,
    playClicked,
    setPlayClicked,
    setCorrectAnswer,
    result,
    setTimeExpired,
    dragChange
  };

  return (
    <div className="App">
      <Provider value={appContext}>
        <Countdown />
        <Header>Create the word by dragging letter into the empty boxes</Header>
        <SubHeader>You have one minute</SubHeader>
        <PlayButton />
        {correctAnswer && <Header>YOU WON !</Header>}
        {wrongAnswer === 3 && <Header>YOU LOST !</Header>}
        {/* {playClicked && <Header>YOUR TIME EXPIRED !</Header>} */}

        {!timeExpired && <DragAndDrop />}
      </Provider>
    </div>
  );
}
