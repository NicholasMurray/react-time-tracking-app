import React, {Component} from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
import { newTimer } from '../helpers/utilities';
import uuidV4 from 'uuid/v4';

class TimersDashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timers: [ 
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
              ]
    }
    this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this)
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this)
    this.handleTrashClick = this.handleTrashClick.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleStopClick = this.handleStopClick.bind(this)
    this.createTimer = this.createTimer.bind(this)
    this.deleteTimer = this.deleteTimer.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }
  handleCreateFormSubmit(timer) {
    this.createTimer(timer);
  }
  handleEditFormSubmit(attrs) {
    this.updateTimer(attrs);
  }
  handleTrashClick(timerId) {
    this.deleteTimer(timerId);
  }
  handleStartClick(timerId) {
    this.startTimer(timerId);
  }
  handleStopClick(timerId) {
    this.stopTimer(timerId);
  }
  createTimer(timer) {
    const t = newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    })
  }
  deleteTimer(timerId) {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId),
    });
  }
  updateTimer(attrs) {
    this.setState({
      timers: this.state.timers.map((timer) => {
          if (timer.id === attrs.id) {
            return Object.assign({}, timer, {
              title: attrs.title,
              project: attrs.project,
            });
          } else {
            return timer;
          }
      }),
    });
  }
  startTimer(timerId) {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          });
        } else {
          return timer;
        }
      })
    });
  }
  stopTimer(timerId) {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
          });
        } else {
          return timer;
        }
      })
    });
  }
  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList 
            timers={this.state.timers} 
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick} 
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}

export default TimersDashBoard;
