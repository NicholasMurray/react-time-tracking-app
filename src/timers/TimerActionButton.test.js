import React from 'react';
import ReactDOM from 'react-dom';
import TimerActionButton from './TimerActionButton';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimerActionButton />, div);
});

it('displays Stop if the timerIsRunning', () => {
  const wrapper = shallow(
    <TimerActionButton timerIsRunning={true} />
  );
  expect(
    wrapper.contains('Stop')
  ).toBe(true);
});

it('displays Start if timerIsRunning is false', () => {
  const wrapper = shallow(
    <TimerActionButton timerIsRunning={false} />
  );
  expect(
    wrapper.contains('Start')
  ).toBe(true);
})
