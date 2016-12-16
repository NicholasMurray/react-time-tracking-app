import React from 'react';
import ReactDOM from 'react-dom';
import TimerActionButton from './TimerActionButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimerActionButton />, div);
});
