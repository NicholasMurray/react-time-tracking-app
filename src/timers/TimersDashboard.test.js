import React from 'react';
import ReactDOM from 'react-dom';
import TimersDashBoard from './TimersDashBoard';
import { mount } from 'enzyme';

import { 
        getTimers as clientGetTimers, 
        startTimer as clientStartTimer,
        stopTimer as clientStopTimer,
        createTimer as clientCreateTimer,
        deleteTimer as clientDeleteTimer,
        updateTimer as clientUpdateTimer
       } from '../helpers/client';

jest.mock('../helpers/client');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimersDashBoard />, div);
});

it('should show a timer form on clicking the plus button', () => {
  const wrapper = mount(
    <TimersDashBoard />
  );

  // verify form not displayed before plus click
  expect(
    (wrapper.find('.form').first().length == 0)
  ).toBe(true)

  const plus = wrapper.find('button').first();
  plus.simulate('click');

  // verify form displayed after plus click
  expect(
    (wrapper.find('.form').first().length > 0)
  ).toBe(true)

  wrapper.unmount();
});


it('should create a new timer on form submit', () => {
  const wrapper = mount(
    <TimersDashBoard />
  );

  const plus = wrapper.find('button').first();
  plus.simulate('click');

  const button = wrapper.find('.blue').first();
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.simulate('change', {target: {value: 'title changed'}});
  projectInput.simulate('change', {target: {value: 'project changed'}});
  button.simulate('click');

  //expect a timer to be created
  expect(
     (wrapper.state().timers.length > 0)
  ).toBe(true);

  wrapper.unmount();
});

