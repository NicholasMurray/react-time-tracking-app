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

function timerExists(timer) {
  return timer.title === 'first title';
}

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

it('should stop and start a timer on clicking the stop and start buttons', () => {
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

  // start the timer
  const start = wrapper.find('.green').first();
  start.simulate('click');
  const startTime = wrapper.state().timers[0].elapsed;

  // stop the timer
  const stop = wrapper.find('.red').first();
  stop.simulate('click');
  const stopTime = wrapper.state().timers[0].elapsed;

  expect(
    (startTime < stopTime)
  ).toBe(true);

  wrapper.unmount();
});

it('should update the correct timer on form submit', () => {
  const wrapper = mount(
    <TimersDashBoard />
  );

  const plus = wrapper.find('button').first();
  plus.simulate('click');

  const button = wrapper.find('.blue').first();
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.node.value = 'title added'
  projectInput.node.value = 'project added'
  titleInput.simulate('change', titleInput);
  projectInput.simulate('change', projectInput);
  button.simulate('click');

  const titleBeforeUpdate = wrapper.state().timers[0].title;
  const edit = wrapper.find('span.edit');
  edit.simulate('click');

    // create and add second timer to the state
  const secondTimer = {
    "title":"second title",
    "project":"second project",
    "elapsed":386,
    "id":"a73c1d19-f32d-4aff-b470-cea4e792406a",
    "runningSince":1300000
  }
  wrapper.setState({timers: wrapper.state().timers.concat(secondTimer)});

  // Update the form and click update button
  const updateButton = wrapper.find('.blue').first();
  const titleInputUpdate = wrapper.find('input').first();
  const projectInputUpdate = wrapper.find('input').at(1);
  titleInputUpdate.node.value = 'new title'
  projectInputUpdate.node.value = 'new project'
  titleInputUpdate.simulate('change', titleInputUpdate);
  projectInputUpdate.simulate('change', projectInputUpdate);
  updateButton.simulate('click');

  const titleAfterUpdate = wrapper.state().timers[0].title;

  expect(
    (titleBeforeUpdate != titleAfterUpdate)
  ).toBe(true);

  wrapper.unmount();
});

it('should create a update a timer on form submit', () => {
  const wrapper = mount(
    <TimersDashBoard />
  );

  const plus = wrapper.find('button').first();
  plus.simulate('click');

  const button = wrapper.find('.blue').first();
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.node.value = 'title added'
  projectInput.node.value = 'project added'
  titleInput.simulate('change', titleInput);
  projectInput.simulate('change', projectInput);
  button.simulate('click');

  const titleBeforeUpdate = wrapper.state().timers[0].title;
  const edit = wrapper.find('span.edit');
  edit.simulate('click');

  // Update the form and click update button
  const updateButton = wrapper.find('.blue').first();
  const titleInputUpdate = wrapper.find('input').first();
  const projectInputUpdate = wrapper.find('input').at(1);
  titleInputUpdate.node.value = 'new title'
  projectInputUpdate.node.value = 'new project'
  titleInputUpdate.simulate('change', titleInputUpdate);
  projectInputUpdate.simulate('change', projectInputUpdate);
  updateButton.simulate('click');

  const titleAfterUpdate = wrapper.state().timers[0].title;

  expect(
    (titleBeforeUpdate != titleAfterUpdate)
  ).toBe(true);

  wrapper.unmount();
});


it('should stop and start a timer on clicking the stop and start buttons', () => {
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

  // start the timer
  const start = wrapper.find('.green').first();
  start.simulate('click');
  const startTime = wrapper.state().timers[0].elapsed;

  // stop the timer
  const stop = wrapper.find('.red').first();
  stop.simulate('click');
  const stopTime = wrapper.state().timers[0].elapsed;

  expect(
    (startTime < stopTime)
  ).toBe(true);

  wrapper.unmount();
});

it('should stop and start the correct timer (if more than one) on clicking the stop and start buttons', () => {
  const wrapper = mount(
    <TimersDashBoard />
  );

  // create first timer
  const plus = wrapper.find('button').first();
  plus.simulate('click');

  const button = wrapper.find('.blue').first();
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.node.value = 'first title';
  projectInput.node.value = 'first project'
  titleInput.simulate('change', titleInput);
  projectInput.simulate('change', projectInput);
  button.simulate('click');

  // create and add second timer to the state
  const secondTimer = {
    "title":"second title",
    "project":"second project",
    "elapsed":386,
    "id":"a73c1d19-f32d-4aff-b470-cea4e792406a",
    "runningSince":1300000
  }
  wrapper.setState({timers: wrapper.state().timers.concat(secondTimer)});

  // start the timer
  const firstTimerStartTime = wrapper.state().timers[0].elapsed;
  const secondTimerStartTime = wrapper.state().timers[1].elapsed;
  const start = wrapper.find('.green').first();
  start.simulate('click');

  // stop the timer
  const stop = wrapper.find('.red').first();
  stop.simulate('click');
  const firstTimerStopTime = wrapper.state().timers[0].elapsed;
  const secondTimerStopTime = wrapper.state().timers[1].elapsed;

  // expect first timer to have stopped and started
  expect(
    (firstTimerStartTime < firstTimerStopTime)
  ).toBe(true);

  // expect second timer to have not changed
  expect(
    (secondTimerStartTime === secondTimerStopTime)
  ).toBe(true);

  wrapper.unmount();
});



it('should delete the correct timer (if more than one) on clicking the trash icon', () => {
  const wrapper = mount(
    <TimersDashBoard />
  );

  // create first timer
  const plus = wrapper.find('button').first();
  plus.simulate('click');

  const button = wrapper.find('.blue').first();
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.node.value = 'first title';
  projectInput.node.value = 'first project'
  titleInput.simulate('change', titleInput);
  projectInput.simulate('change', projectInput);
  button.simulate('click');

  // create and add second timer to the state
  const secondTimer = {
    "title":"second title",
    "project":"second project",
    "elapsed":386,
    "id":"a73c1d19-f32d-4aff-b470-cea4e792406a",
    "runningSince":1300000
  }
  wrapper.setState({timers: wrapper.state().timers.concat(secondTimer)});

  const trash = wrapper.find('.trash').first();
  trash.simulate('click');

  // expect first timer to have been deleted
  expect(
    wrapper.state().timers.some(timerExists)
  ).toBe(false);

  // expect second timer to have not been deleted
  expect(
    (wrapper.state().timers[0].id === secondTimer.id)
  ).toBe(true);

  wrapper.unmount();
});
