import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import '../../setupTests';
import Countdown from './Countdown';
import { Provider } from '../../utils/context';

describe('<playButton />', () => {
  let wrapper;
  let counter;
  const setLostByTime = jest.fn();
  const setTimeExpired = jest.fn();
  const playClicked = jest.fn();
  beforeEach(() => {
    const setup = values => {
      return mount(
        <Provider value={values}>
          <Countdown />
        </Provider>
      );
    };

    wrapper = values => setup(values);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const findByTestAttr = (wrp, val) => {
    return wrp.find(`[data-test='${val}']`);
  };

  it('Countdown element when running', () => {
    counter = findByTestAttr(
      wrapper({
        setTimeExpired,
        setLostByTime,
        playClicked,
        allowdTime: 10,
        timeExpired: false,
      }),
      'counter'
    );
    expect(counter).toHaveStyleRule('color', 'green');
  });

  it('Countdown element when allowed time is 0', () => {
    counter = findByTestAttr(
      wrapper({
        setTimeExpired,
        setLostByTime,
        playClicked: true,
        allowdTime: 0,
        timeExpired: false,
      }),
      'counter'
    );
    expect(counter).toHaveStyleRule('color', 'green');
  });

  it('Countdown element when timeExpired', () => {
    counter = findByTestAttr(
      wrapper({
        setTimeExpired,
        setLostByTime,
        playClicked: true,
        allowdTime: 10,
        timeExpired: true,
      }),
      'counter'
    );
    expect(counter.length).toBe(0);
  });
});
