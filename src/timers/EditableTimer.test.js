import React from 'react';
import ReactDOM from 'react-dom';
import EditableTimer from './EditableTimer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditableTimer />, div);
});
