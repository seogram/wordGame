import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import 'jest-styled-components';
import App from './App';
import './setupTests';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    const setup = () => {
      return mount(<App />);
    };

    wrapper = setup();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const findByTestAttr = (wrp, val) => {
    return wrp.find(`[data-test='${val}']`);
  };

  it('Should dispaly header and sub header texts', () => {
    const headerLabel = findByTestAttr(wrapper, 'header-label');
    expect(headerLabel.first().text()).toEqual(
      'Create the word by dragging letter into the empty boxes'
    );

    const sunHeaderLable = findByTestAttr(wrapper, 'subheader-label');
    expect(sunHeaderLable.first().text()).toEqual('You have one minute');
  });

  it('should dispaly Play button component', () => {
    const playBtn = findByTestAttr(wrapper, 'play-btn-compo');
    expect(playBtn.length).toBe(1);
  });
});
