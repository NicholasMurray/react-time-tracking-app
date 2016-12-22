import React, {Component} from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
import { newTimer } from '../helpers/utilities';
import { 
        getTimers as clientGetTimers, 
        startTimer as clientStartTimer,
        stopTimer as clientStopTimer,
        createTimer as clientCreateTimer,
        deleteTimer as clientDeleteTimer,
        updateTimer as clientUpdateTimer
       } from '../helpers/client';
import logo from '../images/logo.svg';
import '../styles/App.css'

class TimersDashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timers: []
    }
    this.loadTimersFromServer = this.loadTimersFromServer.bind(this)
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
  componentDidMount() {
    this.loadTimersFromServer();
    setInterval(this.loadTimersFromServer, 5000);
  }
  loadTimersFromServer() {
      clientGetTimers((serverTimers) => (
      this.setState({ timers: serverTimers })
      )
    );
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

    clientCreateTimer(t);
  }
  deleteTimer(timerId) {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId),
    });

    clientDeleteTimer({ id: timerId });
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

    clientUpdateTimer(attrs);
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

    clientStartTimer(
      { id: timerId, start: now }
    );
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

    clientStopTimer(
      { id: timerId, stop: now }
    );
  }
  render() {
    return (
      <div>
        <div className="ui three column centered grid">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
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
      </div>
    );
  }
}

export default TimersDashBoard;
