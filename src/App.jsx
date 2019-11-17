import React, { useEffect, useState } from 'react';
import Countdown from './components/countDown/Countdown';
import DragAndDrop from './dragAndDrop';
import PlayButton from './components/playButton/playButton';
import { Container, Header, SubHeader, Label } from './styles';
import { Provider } from './utils/context';
import shuffle from './utils/shuffle/shuffle';
import randomArrayPicker from './utils/randomArrayPicker/randomArrayPicker';
import draggableItemMaker from './utils/draggableItemMaker/draggableItemMaker';
import charMatcher from './utils/charMatcher/charMatcher';
import isAnswerCorrect from './utils/isAnswerCorrect/isAnswerCorrect';
import { answersPool, wordsPool } from './initialData';

export default function App() {
  const [timeExpired, setTimeExpired] = useState(true);
  const [lostByTime, setLostByTime] = useState(false);
  const [randomWords, setRandomWords] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [result, setResult] = useState({});
  const [allowdTime] = useState(60);
  const [playClicked, setPlayClicked] = useState(false);

  useEffect(() => {
    const currentAnswer = shuffle(randomArrayPicker(answersPool, 1))[0];
    const currentRandomWords = shuffle([
      ...randomArrayPicker(wordsPool, 4),
      ...currentAnswer.split(''),
    ]);

    setAnswer(currentAnswer);
    setRandomWords(draggableItemMaker(currentRandomWords));
  }, [timeExpired]);

  const dragChange = chars => {
    const currentResult = charMatcher(answer, chars);
    if (isAnswerCorrect(currentResult, answer)) {
      setCorrectAnswer(true);
      setTimeExpired(true);
    }
    setResult(currentResult);
  };

  const checkWrongChar = (selectedChar, droppableId) => {
    if (answer.charAt(droppableId) !== selectedChar.content.toLowerCase()) {
      if (wrongAnswer + 1 === 3) {
        setTimeExpired(true);
      }
      setWrongAnswer(wrongAnswer + 1);
    }
  };
  const handlePlay = () => {
    setPlayClicked(!playClicked);
    setLostByTime(false);
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
    setLostByTime,
    result,
    setTimeExpired,
    dragChange,
    checkWrongChar,
  };

  return (
    <Container>
      <Provider value={appContext}>
        <Countdown />
        <Header data-test='header-label'>
          Create the word by dragging letter into the empty boxes
        </Header>
        <SubHeader data-test='subheader-label'>You have one minute</SubHeader>
        <PlayButton data-test='play-btn-compo' />
        {correctAnswer && <Label state='success'>YOU WON !</Label>}
        {wrongAnswer === 3 && (
          <Label data-test='wrong-answer-label' state='failure'>
            TOO WRONG ANSWERS !
          </Label>
        )}
        {lostByTime && (
          <Label data-test='time-expired-label' state='failure'>
            YOUR TIME EXPIRED !
          </Label>
        )}

        {!timeExpired && <DragAndDrop data-test='drag-compo' />}
      </Provider>
    </Container>
  );
}
