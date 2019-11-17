import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import '../../setupTests';
import PlayButton from './playButton';
import { Provider } from '../../utils/context';

describe('<playButton />', () => {
  let wrapper;
  let playBtn;
  const handlePlay = jest.fn();
  const setTimeExpired = jest.fn();
  const setCorrectAnswer = jest.fn();
  beforeEach(() => {
    const setup = values => {
      return mount(
        <Provider value={values}>
          <PlayButton />
        </Provider>
      );
    };

    wrapper = values => setup(values);
  });

  const findByTestAttr = (wrp, val) => {
    return wrp.find(`[data-test='${val}']`);
  };

  it('button element when time is running', () => {
    playBtn = findByTestAttr(
      wrapper({
        handlePlay,
        setTimeExpired,
        setCorrectAnswer,
        timeExpired: false,
      }),
      'play-btn'
    );
    expect(playBtn).toHaveStyleRule('opacity', '0');
  });

  it('button element when timeExpired', () => {
    playBtn = findByTestAttr(
      wrapper({
        handlePlay,
        setTimeExpired,
        setCorrectAnswer,
        timeExpired: true,
      }),
      'play-btn'
    );
    expect(playBtn).toHaveStyleRule('opacity', '1');
    expect(playBtn.last().text()).toBe('Play');
  });

  it('when button clicked', () => {
    playBtn = findByTestAttr(
      wrapper({
        handlePlay,
        setTimeExpired,
        setCorrectAnswer,
        timeExpired: true,
      }),
      'play-btn'
    );

    playBtn.last().simulate('click');
    expect(handlePlay).toBeCalled();
    expect(handlePlay).toHaveBeenCalledTimes(1);
    expect(setTimeExpired).toBeCalled();
    expect(setTimeExpired).toHaveBeenCalledTimes(1);
    const passedValue = setTimeExpired.mock.calls[0][0];
    expect(passedValue).toBe(false);
    expect(setCorrectAnswer).toBeCalled();
    expect(setCorrectAnswer).toHaveBeenCalledTimes(1);
    const correctAnswerStatus = setCorrectAnswer.mock.calls[0][0];
    expect(correctAnswerStatus).toBe(false);
  });
});
