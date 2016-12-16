import React from 'react';
import ReactDOM from 'react-dom';
import ToggleableTimerForm from './ToggleableTimerForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToggleableTimerForm />, div);
});
