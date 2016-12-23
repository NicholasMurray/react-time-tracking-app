import React from 'react';
import ReactDOM from 'react-dom';
import ToggleableTimerForm from './ToggleableTimerForm';
import { mount } from 'enzyme';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToggleableTimerForm />, div);
});

it('should open form', () => {
  const onFormSubmit = sinon.spy();
  const wrapper = mount(
    <ToggleableTimerForm onFormSubmit={onFormSubmit} />
  );

  const button = wrapper.find('button').first();
  button.simulate('click');
  expect(
    wrapper.state().isOpen
  ).toBe(true);
  wrapper.unmount();
});

it('should submit form', () => {
  const onFormSubmit = sinon.spy();
  const wrapper = mount(
    <ToggleableTimerForm onFormSubmit={onFormSubmit} />
  );

  // set form open
  wrapper.setState({ isOpen: true });

  const button = wrapper.find('button').first();
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.simulate('change', {target: {value: 'title changed'}});
  projectInput.simulate('change', {target: {value: 'title project'}});
  button.simulate('click');
  expect(
    onFormSubmit.calledOnce
  ).toBe(true);
  wrapper.unmount();
});

it('should close form', () => {
  const onFormSubmit = sinon.spy();
  const wrapper = mount(
    <ToggleableTimerForm onFormSubmit={onFormSubmit} />
  );

  // set form open
  wrapper.setState({ isOpen: true });

  const button = wrapper.find('button').at(1);
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.simulate('change', {target: {value: 'title changed'}});
  projectInput.simulate('change', {target: {value: 'title project'}});
  button.simulate('click');
  expect(
    wrapper.state().isOpen
  ).toBe(false);
  wrapper.unmount();
});
