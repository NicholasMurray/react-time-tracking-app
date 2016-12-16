import React from 'react';
import ReactDOM from 'react-dom';
import EditableTimerList from './EditableTimerList';
import uuidV4 from 'uuid/v4';

const timers = [ 
                {
                  title: 'Practice squat',
                  project: 'Gym Chores',
                  id: uuidV4(),
                  elapsed: 5456099,
                  runningSince: Date.now(),
                },
                {
                  title: 'Bake squash',
                  project: 'Kitchen Chores',
                  id: uuidV4(),
                  elapsed: 1273998,
                  runningSince: null,
                },
              ];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditableTimerList timers={timers} />, div);
});
