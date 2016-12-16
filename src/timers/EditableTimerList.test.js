import React from 'react';
import ReactDOM from 'react-dom';
import EditableTimerList from './EditableTimerList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditableTimerList />, div);
});
